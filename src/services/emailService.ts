import { format } from 'date-fns';
import axios, { AxiosError } from 'axios';

interface Service {
  name: string;
  description: string;
  duration: string;
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

export type EmailType = 'user' | 'admin';

class EmailService {
  private baseURL = 'http://localhost:3000';

  private formatDate(date: Date): string {
    return format(date, 'MMMM do, yyyy');
  }

  private async sendEmail(type: EmailType, details: BookingDetails): Promise<void> {
    try {
      const endpoint = type === 'user' ? '/api/send-user-email' : '/api/send-admin-email';
      console.log(`Sending ${type} email to endpoint:`, this.baseURL + endpoint);
      
      const response = await axios.post(this.baseURL + endpoint, {
        name: details.name,
        email: details.email,
        phone: details.phone,
        services: details.services,
        date: this.formatDate(details.date),
        time: details.time,
        duration: details.duration,
        notes: details.notes
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
      
      // Send both emails in parallel
      await Promise.all([
        this.sendEmail('user', details),
        this.sendEmail('admin', details)
      ]);
      
      console.log('Both emails sent successfully');
    } catch (error) {
      console.error('Error sending booking emails:', error);
      throw new Error('Failed to send booking confirmation emails');
    }
  }

  public async sendUserEmail(details: BookingDetails): Promise<void> {
    await this.sendEmail('user', details);
  }

  public async sendAdminEmail(details: BookingDetails): Promise<void> {
    await this.sendEmail('admin', details);
  }
}

// Export a singleton instance
export const emailService = new EmailService();
