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

// Email configuration - using existing Zoho setup from the project
const createTransporter = () => {
  // Use the same Zoho configuration as the existing contact form
  return nodemailer.createTransport({
    host: "smtp.zohocloud.ca",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const getMonthlyEmailTemplate = (clientName: string) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  return {
    subject: `🎉 Happy New Month - ${currentMonth}! | UMM Transport & Logistics`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Happy New Month</title>
        <style>
          body { font-family: 'Sarabun', Arial, sans-serif; line-height: 1.6; color: #000038; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { 
            background: linear-gradient(135deg, #001B90 0%, #29ABE2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 15px 15px 0 0; 
          }
          .header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
          .header p { margin: 10px 0 0 0; font-size: 1.2rem; opacity: 0.9; }
          .content { 
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
            padding: 40px 30px; 
            border-radius: 0 0 15px 15px;
            box-shadow: 0 10px 30px rgba(0, 27, 144, 0.1);
          }
          .greeting { font-size: 1.3rem; color: #001B90; font-weight: 600; margin-bottom: 20px; }
          .main-text { font-size: 1.1rem; color: #000038; margin-bottom: 25px; line-height: 1.7; }
          .features { background: #f8fafc; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #29ABE2; }
          .features h3 { color: #001B90; margin-top: 0; font-size: 1.4rem; }
          .features ul { margin: 15px 0; padding-left: 20px; }
          .features li { margin: 8px 0; color: #000038; font-weight: 500; }
          .cta-section { 
            background: linear-gradient(135deg, #001B90 0%, #29ABE2 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 10px; 
            text-align: center; 
            margin: 30px 0; 
          }
          .cta-text { font-size: 1.2rem; font-weight: 600; margin-bottom: 20px; }
          .button { 
            display: inline-block; 
            background: #d70006; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 15px 0; 
            font-weight: 600;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(215, 0, 6, 0.3);
            transition: all 0.3s ease;
          }
          .button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(215, 0, 6, 0.4); }
          .signature { margin-top: 30px; color: #001B90; font-weight: 600; }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding: 25px; 
            color: #666; 
            font-size: 0.9rem; 
            background: #f8f9fa; 
            border-radius: 10px;
          }
          .social-section { margin: 20px 0; }
          .highlight { background: linear-gradient(135deg, #FFB930, #DED9CE); padding: 2px 8px; border-radius: 4px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Happy New Month!</h1>
            <p>Welcome to ${currentMonth}</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${clientName},</div>
            
            <div class="main-text">
              We hope this new month brings you <span class="highlight">prosperity, success, and amazing opportunities!</span>
            </div>
            
            <div class="main-text">
              As we step into ${currentMonth}, we want to take a moment to thank you for being such a valued client. Your trust in <strong>UMM Transport & Logistics</strong> means the world to us, and we're committed to providing you with exceptional service every step of the way.
            </div>
            
            <div class="features">
              <h3>🚚 Why Choose UMM Transport & Logistics?</h3>
              <ul>
                <li>✅ <strong>Reliable & Timely Delivery</strong> - We value your time</li>
                <li>✅ <strong>Professional Experienced Team</strong> - Skilled professionals you can trust</li>
                <li>✅ <strong>Competitive Pricing</strong> - Best value for your money</li>
                <li>✅ <strong>24/7 Customer Support</strong> - We're here when you need us</li>
                <li>✅ <strong>Secure Handling</strong> - Your goods are safe with us</li>
                <li>✅ <strong>Real-time Tracking</strong> - Know where your shipment is</li>
              </ul>
            </div>
            
            <div class="cta-section">
              <div class="cta-text">📢 <strong>Don't Keep Us a Secret!</strong></div>
              <p style="margin: 15px 0; font-size: 1.1rem;">
                Tell your friends, family, and business partners about our excellent transportation and logistics services! 
                Word-of-mouth recommendations from satisfied clients like you are the best compliment we can receive.
              </p>
              <p style="margin: 15px 0; font-size: 1rem; opacity: 0.9;">
                <strong>Refer someone today and help them experience the UMM difference!</strong>
              </p>
            </div>
            
            <div class="main-text">
              Whether you need local delivery, long-distance transport, or logistics solutions, we're here to make your life easier. 
              <strong>Contact us today</strong> for any transportation needs!
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+1234567890" class="button">📞 Call Us Now</a>
              <a href="mailto:${process.env.EMAIL_USER}" class="button">📧 Send Email</a>
            </div>
            
            <div class="signature">
              <p>Wishing you a month filled with success and happiness!</p>
              <p><strong>Best regards,<br>The UMM Transport & Logistics Team</strong></p>
            </div>
          </div>
          <div class="footer">
            <p><strong>© ${new Date().getFullYear()} UMM Transport & Logistics</strong></p>
            <p>Your Trusted Partner in Transportation Solutions</p>
            <div class="social-section">
              <p>🌟 Thank you for choosing UMM Transport & Logistics! 🌟</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Happy New Month - ${currentMonth}!
      
      Dear ${clientName},
      
      We hope this new month brings you prosperity, success, and amazing opportunities!
      
      As we step into ${currentMonth}, we want to thank you for being such a valued client. Your trust in UMM Transport & Logistics means the world to us.
      
      Why Choose UMM Transport & Logistics?
      ✅ Reliable & Timely Delivery
      ✅ Professional Experienced Team  
      ✅ Competitive Pricing
      ✅ 24/7 Customer Support
      ✅ Secure Handling
      ✅ Real-time Tracking
      
      DON'T KEEP US A SECRET!
      Tell your friends, family, and business partners about our excellent transportation and logistics services! Word-of-mouth recommendations from satisfied clients like you are the best compliment we can receive.
      
      Contact us today for any transportation needs!
      
      Wishing you a month filled with success and happiness!
      
      Best regards,
      The UMM Transport & Logistics Team
      
      © ${new Date().getFullYear()} UMM Transport & Logistics - Your Trusted Partner in Transportation Solutions
    `
  };
};

// POST - Send monthly email campaign to all clients
export async function POST(request: NextRequest) {
  try {
    const authResult = await checkAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || 
        process.env.EMAIL_USER === 'your-actual-email@yourdomain.com' ||
        process.env.EMAIL_PASSWORD === 'your-actual-zoho-app-password') {
      return NextResponse.json({
        success: false,
        message: 'Email credentials not configured. Please update your .env.local file with actual Zoho email credentials.',
        sentCount: 0,
        instructions: [
          '1. Open .env.local file in your project root',
          '2. Replace EMAIL_USER with your actual Zoho email address',
          '3. Replace EMAIL_PASSWORD with your actual Zoho app password',
          '4. Restart the development server (npm run dev)',
          '5. Get Zoho app password from: Account Settings > Security > App Passwords'
        ]
      }, { status: 400 });
    }

    const db = getDatabase();
    const clients = await db.getClientsForEmailCampaign();

    if (clients.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No clients with email addresses found',
        sentCount: 0
      });
    }

    const transporter = createTransporter();
    let sentCount = 0;
    const errors: string[] = [];

    // Test the connection first
    try {
      await transporter.verify();
    } catch (connectionError: unknown) {
      const errorMessage = connectionError instanceof Error ? connectionError.message : 'Unknown connection error';
      return NextResponse.json({
        success: false,
        message: 'Failed to connect to email server. Please check your email credentials.',
        error: errorMessage,
        instructions: [
          'Verify your Zoho email credentials in .env.local',
          'Make sure you are using an app password, not your regular password',
          'Check that your Zoho account has SMTP access enabled'
        ]
      }, { status: 500 });
    }

    // Send emails to all clients
    for (const client of clients) {
      try {
        const emailTemplate = getMonthlyEmailTemplate(client.name);
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: client.email,
          subject: emailTemplate.subject,
          text: emailTemplate.text,
          html: emailTemplate.html
        });

        sentCount++;
        console.log(`✅ Email sent successfully to ${client.email}`);
      } catch (emailError: unknown) {
        console.error(`❌ Failed to send email to ${client.email}:`, emailError);
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
        errors.push(`${client.name} (${client.email}): ${errorMessage}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Monthly emails sent successfully to ${sentCount} out of ${clients.length} clients`,
      sentCount,
      totalClients: clients.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error: unknown) {
    console.error('Monthly email campaign error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        message: 'Failed to send monthly emails',
        error: errorMessage,
        troubleshooting: [
          'Check your email credentials in .env.local',
          'Make sure you are using Zoho app password',
          'Verify SMTP access is enabled in your Zoho account'
        ]
      },
      { status: 500 }
    );
  }
}