interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  website?: string;
}

interface NewsletterData {
  name: string;
  email: string;
}

export const sendContactEmail = async (data: EmailData): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
          subject: data.subject || 'New Contact Form Submission from AGRICO',
          website: data.website || 'AGRICO'
        }
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const sendNewsletterEmail = async (data: NewsletterData): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'newsletter',
        data: {
          name: data.name,
          email: data.email,
          subject: 'New Newsletter Subscription from AGRICO',
          website: 'AGRICO'
        }
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, message: 'Failed to subscribe to newsletter' };
  }
};
