"use server";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(data: ContactFormData) {
  try {
    // Validate input
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    // Option 1: If you have Resend configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "contact@yourportfolio.com",
          to: process.env.CONTACT_EMAIL || "janalcaide@spup.edu.ph",
          replyTo: data.email,
          subject: `New Contact: ${data.subject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
        });

        return {
          success: true,
          message: "Message sent successfully! I will get back to you soon.",
        };
      } catch (resendError) {
        console.error("Resend error:", resendError);
      }
    }

    // Option 2: If you have SendGrid configured
    if (process.env.SENDGRID_API_KEY) {
      try {
        const sgMail = await import("@sendgrid/mail");
        sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

        await sgMail.default.send({
          to: process.env.CONTACT_EMAIL || "janalcaide@spup.edu.ph",
          from: process.env.SENDGRID_FROM_EMAIL || "noreply@yourportfolio.com",
          replyTo: data.email,
          subject: `New Contact: ${data.subject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
        });

        return {
          success: true,
          message: "Message sent successfully! I will get back to you soon.",
        };
      } catch (sgError) {
        console.error("SendGrid error:", sgError);
      }
    }

    // Fallback: Log to console (for development)
    console.log("Contact message received:", {
      timestamp: new Date().toISOString(),
      ...data,
    });

    return {
      success: true,
      message:
        "Message received! Thank you for reaching out. I will get back to you soon.",
    };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
