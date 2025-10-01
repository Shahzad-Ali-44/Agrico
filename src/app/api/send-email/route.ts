import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let emailHtml = '';
    let subject = '';

    if (type === 'contact') {
      subject = data.subject || 'New Contact Form Submission from AGRICO';
      emailHtml = `
        <div style="font-family: Inter, sans-serif; max-width: 100%; margin: 0; background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 30%, #ecfdf5 100%); padding: 16px;">
          
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h2 style="color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; text-align: left;">New Contact Form Submission</h2>
            
            <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #65a30d;">
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.name}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.email}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Website:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.website}</p>
              </div>
              
              <div>
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500; line-height: 1.5;">${data.message}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: left; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This email was sent from the AGRICO contact form.
            </p>
          </div>
        </div>
      `;
    } else if (type === 'newsletter') {
      subject = data.subject || 'New Newsletter Subscription from AGRICO';
      emailHtml = `
        <div style="font-family: Inter, sans-serif; max-width: 100%; margin: 0; background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 30%, #ecfdf5 100%); padding: 16px;">
          
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h2 style="color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; text-align: left;">New Newsletter Subscription</h2>
            
            <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #65a30d;">
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.name}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.email}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Website:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500;">${data.website}</p>
              </div>
              
              <div>
                <strong style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Welcome Message:</strong>
                <p style="color: #1f2937; font-size: 14px; margin: 4px 0 0 0; font-weight: 500; line-height: 1.5;">${data.name} has subscribed to receive our latest updates.</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: left; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This email was sent from the AGRICO newsletter subscription.
            </p>
          </div>
        </div>
      `;
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: subject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
