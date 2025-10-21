import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDatabase } from '@/lib/database';
import nodemailer from 'nodemailer';

// Middleware to check authentication
async function checkAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  const user = verifyToken(token);
  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user };
}

// Create email transporter - using same config as monthly campaign
function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.zohocloud.ca",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Generate thank you email template
function getThankYouEmailTemplate(clientName: string) {
  return {
    subject: '🙏 Thank You for Choosing UMM Transport & Logistics!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - UMM Transport & Logistics</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d4420a 0%, #29ABE2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">UMM Transport & Logistics</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Trusted Moving Partner</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #d4420a; margin-top: 0;">Dear ${clientName},</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you so much for choosing UMM Transport & Logistics for your moving needs! 🙏
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              We truly appreciate your trust in our services and are committed to providing you with the best possible experience. Your satisfaction is our top priority!
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4420a;">
              <h3 style="color: #d4420a; margin-top: 0;">Why Choose UMM?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Professional and reliable service</li>
                <li>Experienced team of movers</li>
                <li>Competitive pricing</li>
                <li>Full insurance coverage</li>
                <li>Customer satisfaction guarantee</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              If you know anyone who needs moving services, we'd be grateful for your referral. Word-of-mouth recommendations from satisfied customers like you are the best compliment we can receive!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+1234567890" style="display: inline-block; background: #d4420a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 5px;">📞 Call Us</a>
              <a href="mailto:admin@unifiedmovingmaster.ca" style="display: inline-block; background: #29ABE2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 5px;">✉️ Email Us</a>
            </div>
            
            <p style="font-size: 16px; color: #666; text-align: center; margin-top: 30px;">
              Thank you again for your business!<br>
              <strong>The UMM Transport & Logistics Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>UMM Transport & Logistics<br>
            Email: admin@unifiedmovingmaster.ca<br>
            This email was sent because you are a valued customer.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${clientName},

Thank you so much for choosing UMM Transport & Logistics for your moving needs!

We truly appreciate your trust in our services and are committed to providing you with the best possible experience. Your satisfaction is our top priority!

Why Choose UMM?
- Professional and reliable service
- Experienced team of movers
- Competitive pricing
- Full insurance coverage
- Customer satisfaction guarantee

If you know anyone who needs moving services, we'd be grateful for your referral. Word-of-mouth recommendations from satisfied customers like you are the best compliment we can receive!

Thank you again for your business!
The UMM Transport & Logistics Team

Contact us: admin@unifiedmovingmaster.ca
    `
  };
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { message: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Get client details
    const db = getDatabase();
    const client = await db.getClientById(clientId);

    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Generate email content
    const emailTemplate = getThankYouEmailTemplate(client.name);

    // Send email
    await transporter.sendMail({
      from: `"UMM Transport & Logistics" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    });

    return NextResponse.json({
      success: true,
      message: `Thank you email sent successfully to ${client.name}!`
    });

  } catch (error) {
    console.error('Send thank you email error:', error);
    return NextResponse.json(
      { message: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}