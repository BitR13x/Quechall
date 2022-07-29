import express, { Request, Response } from 'express';
import nodemailer from "nodemailer";
import rateLimit from 'express-rate-limit';
const router = express.Router();

const FeedbackLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    standardHeaders: false,
    legacyHeaders: false,
    message: "Hey, Hey, slow down.."
});

router.post('/submit', FeedbackLimiter, async (req: Request, res: Response) => {
    let { feedback } = req.body;
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "cac58191fc3071",
            pass: "92540798556515"
        }
    });

    let info = await transport.sendMail({
            from: "FeedBack@example.com",
            to: "FeedBack@example.com",
            subject: "FeedBack",
            text: feedback,
            html: feedback,
        }, (err, info) => {
            console.warn("Error in NodeMailer:", err);
        }
    );

    if (info) {
        return res.send({ message: "Success!" })
    } else {
        return res.send({ message: "Something went wrong!" })
    };
});

export { router as feebackRoutes }