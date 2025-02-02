import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://topedge.vercel.app', 'https://www.topedge.com'] 
    : 'http://localhost:5173'
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

// Contact Form - User Email
app.post('/api/send-contact-user-email', async (req, res) => {
  try {
    const { name, email, phone, companyName, subject, message } = req.body;

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Contact Form - Admin Email
app.post('/api/send-contact-admin-email', async (req, res) => {
  try {
    const { name, email, phone, companyName, subject, message } = req.body;

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ message: 'Failed to send admin notification' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
