import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/~test', (req: Request, res: Response) => {
    return res.send({ message: "Response from API!" });
});

router.post('/get', (req: Request, res: Response) => {
    return res.send({ message: "nope" })
});

export { router as questionRoutes }