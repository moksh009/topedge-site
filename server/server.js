import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying email configuration:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Unified email sending function for both booking and contact
const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Maintenance Form - User Email
app.post('/api/send-maintenance-user-email', async (req, res) => {
  try {
    const { name, email, plan, emailTemplate } = req.body;

    const isChatbot = plan.toLowerCase().includes('chatbot');
    const planType = isChatbot ? 'Chatbot' : 'AI Voice Agent';
    const planColor = isChatbot ? '#4D07E3' : '#0A84FF';
    const planGradient = isChatbot 
      ? 'linear-gradient(135deg, #4D07E3 0%, #7A0BC0 100%)'
      : 'linear-gradient(135deg, #0A84FF 0%, #3B82F6 100%)';

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for your ${planType} maintenance inquiry - TopEdge`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${planType} Maintenance Inquiry - TopEdge</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              .plan-details {
                white-space: pre-wrap;
                font-family: Arial, sans-serif;
                line-height: 1.6;
              }
              .feature-list {
                margin: 0;
                padding-left: 20px;
              }
              .feature-item {
                margin-bottom: 8px;
              }
              .section-title {
                color: ${planColor};
                font-size: 20px;
                margin: 0 0 15px 0;
                font-weight: 600;
              }
              .section-content {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                border: 1px solid #E5E7EB;
              }
              .section-container {
                background-color: #F9FAFB;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
              }
            </style>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <div style="text-align: center; padding: 40px 20px; background: ${planGradient}; color: white;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">TopEdge AI</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">${planType} Maintenance Inquiry</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <!-- Greeting -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1F2937; font-size: 24px; margin: 0 0 15px 0;">Hello ${name},</h2>
                  <p style="color: #4B5563; font-size: 16px; margin: 0;">Thank you for your interest in our ${plan} plan maintenance services. We're excited to help you enhance your business with our ${planType} solution.</p>
                </div>

                <!-- Plan Details Section -->
                <div class="section-container">
                  <h3 class="section-title">Plan Details</h3>
                  <div class="section-content">
                    <div class="plan-details" style="color: #4B5563; font-size: 14px;">
                      ${emailTemplate.split('\n').map(line => {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('===')) {
                          return `<h3 style="color: ${planColor}; font-size: 18px; margin: 20px 0 10px 0; font-weight: 600;">${trimmedLine.replace(/=/g, '').trim()}</h3>`;
                        } else if (trimmedLine.startsWith('•')) {
                          return `<div class="feature-item" style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                            <span style="position: absolute; left: 0;">&bull;</span>
                            ${trimmedLine.substring(1).trim()}
                          </div>`;
                        } else if (trimmedLine.match(/^\d+\./)) {
                          return `<h4 style="color: #1F2937; font-size: 16px; margin: 15px 0 10px 0; font-weight: 600;">${trimmedLine}</h4>`;
                        } else if (trimmedLine.length === 0) {
                          return '<div style="height: 10px;"></div>';
                        } else {
                          return `<p style="margin: 0 0 10px 0;">${trimmedLine}</p>`;
                        }
                      }).join('')}
                    </div>
                  </div>
                </div>

                <!-- Next Steps -->
                <div class="section-container">
                  <h3 class="section-title">Next Steps</h3>
                  <div class="section-content">
                    <p style="color: #4B5563; font-size: 16px; margin: 0 0 15px 0;">Our team will:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
                      <li style="margin-bottom: 8px;">Review your requirements</li>
                      <li style="margin-bottom: 8px;">Analyze your usage needs</li>
                      <li style="margin-bottom: 8px;">Prepare a detailed quotation</li>
                      <li>Contact you within 24-48 business hours</li>
                    </ul>
                  </div>
                </div>

                <!-- Contact -->
                <div class="section-container" style="background-color: #F0FDF4;">
                  <h3 class="section-title">Need Help?</h3>
                  <div class="section-content">
                    <p style="margin: 0; color: #4B5563;">
                      If you have any questions, feel free to:
                    </p>
                    <ul style="margin: 15px 0 0 0; padding-left: 20px; color: #4B5563;">
                      <li style="margin-bottom: 8px;">Reply to this email</li>
                      <li>Contact us at <a href="mailto:support@topedge.ai" style="color: ${planColor}; text-decoration: none;">support@topedge.ai</a></li>
                    </ul>
                  </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding-top: 30px; border-top: 1px solid #E5E7EB; margin-top: 30px;">
                  <p style="color: #6B7280; font-size: 14px; margin: 0;">Best regards,<br>The TopEdge Team</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending maintenance user email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Maintenance Form - Admin Email
app.post('/api/send-maintenance-admin-email', async (req, res) => {
  try {
    const { name, email, phone, plan } = req.body;

    const isChatbot = plan.toLowerCase().includes('chatbot');
    const planType = isChatbot ? 'Chatbot' : 'AI Voice Agent';
    const planColor = isChatbot ? '#4D07E3' : '#0A84FF';
    const planGradient = isChatbot 
      ? 'linear-gradient(135deg, #4D07E3 0%, #7A0BC0 100%)'
      : 'linear-gradient(135deg, #0A84FF 0%, #3B82F6 100%)';

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: 'acctopedge@gmail.com',
      subject: `New ${planType} Maintenance Inquiry: ${plan} Plan`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New ${planType} Maintenance Inquiry - TopEdge</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <div style="text-align: center; padding: 40px 20px; background: ${planGradient}; color: white;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">TopEdge AI</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">New ${planType} Maintenance Inquiry</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <!-- Alert -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1F2937; font-size: 24px; margin: 0 0 15px 0;">New Maintenance Inquiry Received</h2>
                  <p style="color: #4B5563; font-size: 16px; margin: 0;">A new ${planType} maintenance inquiry has been submitted. Here are the details:</p>
                </div>
                
                <!-- Client Information -->
                <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <h3 style="color: ${planColor}; font-size: 20px; margin: 0 0 20px 0;">Client Information</h3>
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #E5E7EB;">
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Name</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${name}</p>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Email</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">
                        <a href="mailto:${email}" style="color: ${planColor}; text-decoration: none;">${email}</a>
                      </p>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Phone</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">
                        <a href="tel:${phone}" style="color: ${planColor}; text-decoration: none;">${phone}</a>
                      </p>
                    </div>
                    <div>
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Selected Plan</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${plan}</p>
                    </div>
                  </div>
                </div>

                <!-- Action Required -->
                <div style="background-color: #FEF2F2; border-radius: 12px; padding: 25px;">
                  <h3 style="color: #DC2626; font-size: 20px; margin: 0 0 15px 0;">Action Required</h3>
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #FCA5A5;">
                    <p style="margin: 0 0 15px 0; color: #4B5563;">Please take the following actions:</p>
                    <ol style="margin: 0; padding-left: 20px; color: #4B5563;">
                      <li style="margin-bottom: 10px;">Prepare a detailed quote including:
                        <ul style="margin: 5px 0 0 20px;">
                          <li style="margin-bottom: 5px;">Monthly maintenance fee</li>
                          <li style="margin-bottom: 5px;">Implementation timeline</li>
                          <li style="margin-bottom: 5px;">Customization options</li>
                          <li>Support and maintenance details</li>
                        </ul>
                      </li>
                      <li style="margin-bottom: 10px;">Review the client's requirements and suggest any additional features</li>
                      <li>Respond to the inquiry within 24-48 business hours</li>
                    </ol>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 40px;">
                  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                    <p style="margin: 0;">© 2024 TopEdge AI. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    res.status(200).json({ message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ message: 'Failed to send admin notification', error: error.message });
  }
});

// Contact Form - User Email
app.post('/api/send-contact-user-email', async (req, res) => {
  try {
    const { name, email, phone, companyName, subject, message } = req.body;

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting TopEdge',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">Thank You for Contacting TopEdge</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0A84FF;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
          </div>
          
          <p>We typically respond within 24-48 business hours.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666;">Best Regards,</p>
            <p style="color: #666;">The TopEdge Team</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Contact Form - Admin Email
app.post('/api/send-contact-admin-email', async (req, res) => {
  try {
    const { name, email, phone, companyName, subject, message } = req.body;

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: 'acctopedge@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0A84FF;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>This is an automated notification. Please respond to the inquiry within 24-48 hours.</p>
            <p>You can reply directly to the sender at: ${email}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ message: 'Failed to send admin notification', error: error.message });
  }
});

// Booking - User Email
app.post('/api/send-user-email', async (req, res) => {
  try {
    const { name, email, services, date, time, duration, notes } = req.body;

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation - TopEdge',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">Booking Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking with TopEdge. Your consultation has been confirmed.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0A84FF;">Booking Details:</h3>
            <p><strong>Services:</strong> ${services.map(s => s.name).join(', ')}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          </div>
          
          <p>We will send you a meeting link before the scheduled time.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666;">Best Regards,</p>
            <p style="color: #666;">The TopEdge Team</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: 'Booking confirmation sent successfully' });
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    res.status(500).json({ message: 'Failed to send booking confirmation', error: error.message });
  }
});

// Booking - Admin Email
app.post('/api/send-admin-email', async (req, res) => {
  try {
    const { name, email, services, date, time, duration, notes } = req.body;

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: 'acctopedge@gmail.com',
      subject: `New Booking: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">New Booking Received</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0A84FF;">Booking Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Services:</strong> ${services.map(s => s.name).join(', ')}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Please schedule the meeting and send the link to the client.</p>
            <p>You can contact the client at: ${email}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ message: 'Failed to send admin notification', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Email server is running',
    emailConfigured: !!process.env.EMAIL_USER
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Email server configured with: ${process.env.EMAIL_USER}`);
}); 