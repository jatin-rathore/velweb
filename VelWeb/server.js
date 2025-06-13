// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/schedule", async (req, res) => {
    const { name, email, company, date, time, message } = req.body;

    // TODO: Save to database, Google Sheet, or send an email

    // Example using nodemailer to send an email
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your_email@gmail.com",
            pass: "your_email_password",
        },
    });

    const mailOptions = {
        from: email,
        to: "your_email@gmail.com",
        subject: "New LiFi Demo Request",
        text: `
New Demo Request:

Name: ${name}
Email: ${email}
Company: ${company}
Preferred Date: ${date}
Preferred Time: ${time}
Message: ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
