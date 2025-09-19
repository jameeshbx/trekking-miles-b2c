import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json()

    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"TrekkingMiles" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    })

    console.log('Message sent: %s', info.messageId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}