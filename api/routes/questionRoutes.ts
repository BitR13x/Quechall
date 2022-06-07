import express, { Request, Response } from 'express';
import randomMathQuestion from "random-math-question";
const router = express.Router();

router.get('/~test', (req: Request, res: Response) => {
    return res.send({message: "Response from API!"});
});

router.post('/get', (req: Request, res: Response) => {
    var mathQuestion1 = randomMathQuestion.get();

    return res.send({ message: mathQuestion1 });
});

export { router as questionRoutes }