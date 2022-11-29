import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.USER);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
