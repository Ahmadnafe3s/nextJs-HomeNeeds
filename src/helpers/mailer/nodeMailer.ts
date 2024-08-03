import nodemailer from 'nodemailer'
import { ResetPasswordHTML, verifyEmailHTML } from './HTMLFiles';

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


export default async function mailer(recipientEmail: string, Subject: string, Content: { OTP: string, username?: string }) {

    try {

        const mailOption: any = {
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: Subject,
            html: Subject === 'Reset Password' ? ResetPasswordHTML(Content?.OTP!, Content?.username!) : verifyEmailHTML(Content.OTP)
        }

        await Transporter.sendMail(mailOption)

    } catch (error: any) {
        throw new Error(error.message)
    }
} 
