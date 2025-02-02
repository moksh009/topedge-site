import { format } from 'date-fns';
import axios, { AxiosError } from 'axios';

interface Service {
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface BookingDetails {
  name: string;
  email: string;
  phone?: string;
  services: Service[];
  date: Date;
  time: string;
  duration: string;
  notes?: string;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
}

export type EmailType = 'user' | 'admin';

class EmailService {
  private baseURL = process.env.NODE_ENV === 'production'
    ? window.location.origin // Use the current domain in production
    : 'http://localhost:3001'; // Use the Express server port in development

  private formatDate(date: Date): string {
    return format(date, 'MMMM do, yyyy');
  }

  private async sendEmail(type: EmailType, endpoint: string, details: any): Promise<void> {
    try {
      console.log(`Sending ${type} email to endpoint:`, this.baseURL + endpoint);
      
      const response = await axios.post(this.baseURL + endpoint, details, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error(`Failed to send ${type} email: ${response.statusText}`);
      }
      
      console.log(`${type} email sent successfully:`, response.data);
    } catch (error) {
      console.error(`Error sending ${type} email:`, error);
      if (error instanceof AxiosError) {
        throw new Error(`Failed to send ${type} email: ${error.response?.data?.message || error.message}`);
      }
      throw new Error(`Failed to send ${type} email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async sendBookingEmails(details: BookingDetails): Promise<void> {
    try {
      console.log('Sending booking emails with details:', details);
      
      const formattedDetails = {
        ...details,
        date: this.formatDate(details.date)
      };
      
      // Send both emails in parallel
      await Promise.all([
        this.sendEmail('user', '/api/send-user-email', formattedDetails),
        this.sendEmail('admin', '/api/send-admin-email', formattedDetails)
      ]);
      
      console.log('Both booking emails sent successfully');
    } catch (error) {
      console.error('Error sending booking emails:', error);
      throw new Error('Failed to send booking confirmation emails');
    }
  }

  public async sendContactEmails(details: ContactDetails): Promise<void> {
    try {
      console.log('Sending contact form emails with details:', details);
      
      // Send both emails in parallel
      await Promise.all([
        this.sendEmail('user', '/api/send-contact-user-email', details),
        this.sendEmail('admin', '/api/send-contact-admin-email', details)
      ]);
      
      console.log('Both contact form emails sent successfully');
    } catch (error) {
      console.error('Error sending contact form emails:', error);
      throw new Error('Failed to send contact form emails');
    }
  }
}

// Export a singleton instance
export const emailService = new EmailService();
