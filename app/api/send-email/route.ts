import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendEmail(data: { destination: string; fullName: string; phone: string; email: string }) {
  const { destination, fullName, phone, email } = data;
  
  // Create a test account using ethereal.email for development
  const testAccount = await nodemailer.createTestAccount();

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${fullName}" <${email}>`,
    to: 'support@trekkingmiles.com', 
    subject: `Callback Request for ${destination}`,
    text: `
      New Callback Request:
      
      Destination: ${destination}
      Full Name: ${fullName}
      Phone: ${phone}
      Email: ${email}
      
      Please contact the customer as soon as possible.
    `,
    html: `
      <h2>New Callback Request</h2>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p>Please contact the customer as soon as possible.</p>
    `,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return {
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info)
  };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await sendEmail(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      previewUrl: result.previewUrl
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const result = await sendEmail(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully via PUT',
      previewUrl: result.previewUrl
    });
  } catch (error) {
    console.error('Error sending email via PUT:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email via PUT' },
      { status: 500 }
    );
  }
}