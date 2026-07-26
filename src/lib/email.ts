// Resend Email Dispatch Engine with Graceful Error Handling
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

export interface LeadEmailPayload {
  name: string;
  email: string;
  serviceNeeded: string;
  budget?: string;
  message: string;
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.log('[Email Engine] Resend API Key unpopulated. Simulated email dispatch for:', payload.email);
    return { success: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ethereal Gear <inquiries@etherealgear.io>',
        to: ['contact@etherealgear.io'],
        subject: `🔥 New Lead Inquiry: ${payload.name} (${payload.serviceNeeded})`,
        html: `
          <h2>New Lead Inquiry Received</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Service Needed:</strong> ${payload.serviceNeeded}</p>
          <p><strong>Budget Range:</strong> ${payload.budget || 'N/A'}</p>
          <p><strong>Message:</strong> ${payload.message}</p>
        `,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { success: false, error: data.message || 'Failed to dispatch email' };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Email Engine] Error sending lead notification email:', err);
    return { success: false, error: err.message };
  }
}
