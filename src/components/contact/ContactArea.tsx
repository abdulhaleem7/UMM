"use client"
import Link from "next/link"
import { useState } from "react";
import { toast } from "react-toastify";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const getContactEmailBody = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #d70006; text-align: center;">New Contact Form Submission</h2>
        <p style="font-size: 16px; color: #555;">Hello, you have received a new message from your website contact form.</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <h3 style="color: #d70006; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Contact Information</h3>
          <p><strong style="color: #d70006;">Name:</strong> ${contactData.name}</p>
          <p><strong style="color: #d70006;">Email Address:</strong> ${contactData.email}</p>
          <p><strong style="color: #d70006;">Phone Number:</strong> ${contactData.phone}</p>
          <p><strong style="color: #d70006;">Subject:</strong> ${contactData.subject}</p>
        </div>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <h3 style="color: #d70006; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Message</h3>
          <p style="background-color: #fff; padding: 10px; border-radius: 3px;">${contactData.message}</p>
        </div>
        
        <p style="font-size: 12px; color: #777; text-align: center; margin-top: 20px;">
          This is an automated email sent from your Borderless Movers contact form.
        </p>
      </div>
    `;
  };

  const validateForm = () => {
    if (!contactData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!contactData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!contactData.subject) {
      toast.error("Subject is required");
      return false;
    }
    if (!contactData.message) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  const sendEmail = async () => {
    const emailRequest = {
      emailBdy: getContactEmailBody(),
      senderEmail: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
    };
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailRequest),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }
      
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.warning("Message saved, but confirmation email could not be sent");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const emailSent = await sendEmail();
      
      if (emailSent) {
        setContactData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        toast.success("Your message has been sent successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
  
    if (!input.startsWith("+1")) {
      input = "+1" + input.replace(/[^0-9]/g, "");
    } else {
      input = "+1" + input.slice(2).replace(/[^0-9]/g, "");
    }
  
    if (input.length > 2) {
      const numbers = input.slice(2);
      let formatted = "+1 ";
  
      if (numbers.length > 0) {
        formatted += "(" + numbers.slice(0, 3);
      }
      if (numbers.length >= 3) {
        formatted += ") " + numbers.slice(3, 6);
      }
      if (numbers.length >= 6) {
        formatted += "-" + numbers.slice(6, 10);
      }
  
      input = formatted;
    }
  
    setContactData(prev => ({
      ...prev,
      phone: input,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="contact__form">
      <div className="row gutter-20">
        <div className="col-md-6">
          <div className="form-grp">
            <input
              type="text"
              id="name"
              placeholder="Your Name *"
              value={contactData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <input
              type="email"
              id="email"
              placeholder="Your Email *"
              value={contactData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <input
              type="tel"
              id="phone"
              placeholder="Your Phone"
              value={contactData.phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <input
              type="text"
              id="subject"
              placeholder="Subject *"
              value={contactData.subject}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="form-grp">
        <textarea
          id="message"
          placeholder="Type Message Here *"
          value={contactData.message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
};

const ContactArea = () => {
  return (
    <section className="contact__area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-map contact-map-two">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d371913.54563385877!2d-80.26278416434535!3d43.260337155528774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c986c27de778f%3A0x2b6aee56d8df0e21!2sHamilton%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sng!4v1745889028249!5m2!1sen!2sng" style={{border:"0"}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="contact__info-item">
              <h4 className="title">Office in Ontario</h4>
              <p className="info-one">Hamilton, <br/> Ontario</p>
              <h4 className="title"><Link href="tel:+1(365-356-3255)">+1(365-356-3255)</Link></h4>
              <p className="info-two">Monday – Saturday: 8:00-18:00 <br/> </p>
              <Link href="mailto:admin@unifiedmovingmaster.ca">admin@unifiedmovingmaster.ca</Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="contact__form-wrap">
              <h2 className="title">Send Us Message</h2>
              <ContactForm />
              <p className="ajax-response mb-0"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactArea