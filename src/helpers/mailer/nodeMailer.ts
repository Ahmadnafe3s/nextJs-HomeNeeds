import nodemailer from 'nodemailer'
import { verifyEmailHTML } from './htmlFiles';

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


export default async function mailer(email: string, Subject: string) {

    try {
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: Subject,
            html: verifyEmailHTML
        }

        await Transporter.sendMail(mailOption)

    } catch (error: any) {
        throw new Error(error.message)
    }
} 
