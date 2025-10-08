import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Password Reset Request - Trekking Miles",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0;">Password Reset Request</h1>
                      <p style="color: #666666; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        You requested to reset your password for your Trekking Miles account. Click the button below to reset your password:
                      </p>
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="border-radius: 4px; background-color: #007bff;">
                            <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0 0 10px 0;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="color: #007bff; font-size: 14px; line-height: 20px; margin: 0 0 20px 0; word-break: break-all;">
                        ${resetUrl}
                      </p>
                      <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0 0 10px 0;">
                        This link will expire in 1 hour.
                      </p>
                      <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0;">
                        If you didn't request a password reset, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                      <p style="color: #999999; font-size: 12px; line-height: 18px; margin: 0;">
                        © 2025 Trekking Miles. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
      Password Reset Request
      
      You requested to reset your password for your Trekking Miles account.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, you can safely ignore this email.
      
      © 2025 Trekking Miles. All rights reserved.
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEmail({ to, subject, html, text }: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
  };

  await transporter.sendMail(mailOptions);
}
