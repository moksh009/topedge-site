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

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Create transporter using Gmail credentials
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying email configuration:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

// API endpoint for sending user emails
app.post('/api/send-user-email', async (req, res) => {
  try {
    const { name, email, service, date, time, duration, notes } = req.body;
    console.log('Received email request for:', email);

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // HTML template for user email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6d28d9;">Booking Confirmed!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for booking a consultation with TopEdge AI. Here are your booking details:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Duration:</strong> ${duration}</p>
          <p><strong>Notes:</strong> ${notes || 'No additional notes'}</p>
        </div>
        
        <p>We will send you a Google Meet link before the meeting.</p>
        <p>Best regards,<br>TopEdge AI Team</p>
      </div>
    `;

    // Configure email options
    const mailOptions = {
      from: {
        name: 'TopEdge AI',
        address: process.env.NEXT_PUBLIC_EMAIL_USER
      },
      to: email,
      subject: 'Booking Confirmation - TopEdge AI',
      html: htmlContent,
      replyTo: process.env.NEXT_PUBLIC_EMAIL_USER
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send email', 
      error: error.message,
      details: error.response || 'No additional details'
    });
  }
});

// API endpoint for sending admin emails
app.post('/api/send-admin-email', async (req, res) => {
  try {
    const { name, email, phone, service, date, time, duration, notes } = req.body;
    console.log('Received admin notification request for booking by:', name);

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // HTML template for admin email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6d28d9;">New Booking Notification</h1>
        <p>A new consultation has been booked with the following details:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Duration:</strong> ${duration}</p>
          <p><strong>Notes:</strong> ${notes || 'No additional notes'}</p>
        </div>
        
        <p>Please schedule the Google Meet and send the link to the client.</p>
      </div>
    `;

    // Configure email options
    const mailOptions = {
      from: {
        name: 'TopEdge AI Booking System',
        address: process.env.NEXT_PUBLIC_EMAIL_USER
      },
      to: process.env.NEXT_PUBLIC_EMAIL_USER, // Send to admin email
      subject: `New Booking - ${service} with ${name}`,
      html: htmlContent
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', info.response);

    res.status(200).json({ message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ 
      message: 'Failed to send admin notification', 
      error: error.message,
      details: error.response || 'No additional details'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Email server configured with: ${process.env.NEXT_PUBLIC_EMAIL_USER}`);
});
