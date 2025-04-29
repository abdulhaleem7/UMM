import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { emailBdy, senderEmail, subject } = req.body;

    try {
        // Configure the transporter for Zoho
        let transporter = nodemailer.createTransport({
            host: "smtp.zohocloud.ca",
            port: 465,
            secure: true, // true for port 465 (SSL)
            auth: {
                user: "admin@unifiedmovingmaster.ca", // your Zoho email
                pass: "9hfNpFXK6PwQ" // use App Password if 2FA is enabled
            }
        });

        // Email options
        let mailOptions = {
            from: "admin@unifiedmovingmaster.ca", // must match authenticated Zoho account
            to: [
                "admin@unifiedmovingmaster.ca",
                senderEmail
            ],
            subject: subject,
            html: emailBdy
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
}
