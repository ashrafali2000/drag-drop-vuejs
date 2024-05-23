const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // To handle large payloads
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "fgrfuk25@gmail.com",
    pass: "vysf jwok aqun rjxi",
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "fgrfuk25@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
