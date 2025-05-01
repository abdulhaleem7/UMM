import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { emailBdy, senderEmail, subject, customerPhone } = req.body; // Add customerPhone to request body

    try {
        // Configure the transporter for Zoho
        let transporter = nodemailer.createTransport({
            host: "smtp.zohocloud.ca",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Customer email options
        let customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: senderEmail,
            subject: subject,
            html: `
                ${emailBdy}
                <div style="padding: 20px; color: #fc5205;">
                    <h4>We've received your order and we will get back to you shortly.</h4>
          </div>
       </div>
            `
        };
        // Admin email options with WhatsApp button
        const whatsappLink = `https://wa.me/${customerPhone ? customerPhone.replace(/[^\d+]/g, '') : ''}`;
        let adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: [process.env.EMAIL_USER],
            subject: `New Order: ${subject}`,
            html: `
                ${emailBdy}
                <div style="margin-top: 20px;">
                    <a href="${whatsappLink}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Contact Customer on WhatsApp
                    </a>
                </div>
       </div>
            `
        };

        // Send both emails
        await transporter.sendMail(customerMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
}