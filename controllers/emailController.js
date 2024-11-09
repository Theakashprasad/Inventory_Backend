import nodemailer from "nodemailer";

export const setEmail = async (req, res) => {
  try {
    const { pdfData } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your email service
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Sales Report",
      text: "sales report has been attached below.",
      attachments: [
        {
          filename: "sales_report.pdf",
          content: Buffer.from(pdfData, "base64"),
          contentType: "application/pdf",
        },
      ],
    };

    const sent = await transporter.sendMail(mailOptions);
    if (sent) return res.status(200).send("Email sent successfully!");
    res.status(500).send("Email sent UNsuccessfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};
