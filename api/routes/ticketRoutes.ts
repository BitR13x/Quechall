import express, { Request, Response } from 'express';
import { Ticket } from '../src/entity/Ticket';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/* GET home page. */
router.get('/~test', (req: Request, res: Response) => {
  return res.send({message: "Response from API!"});
});

router.get('/generateTicket', async (req: Request, res: Response) => {
  let uuid = uuidv4();
  let ticket = await Ticket.create({name: uuid}).save();
  return res.send({message: "Response from api!", TicketRep: ticket, uuid: ticket.name});
});

router.get('/getCount', async (req: Request, res: Response) => {
  let Tickets = await Ticket.find();
  return res.send({message: "Response from api!", count: Tickets.length});
});

router.get('/getTicket', async (req: Request, res: Response) => {
  let { name } = req.body;
  let ticket = await Ticket.findOneBy({name: name});
  return res.send({message: "Response from api!", count: ticket});
});

export { router as ticketRoutes }
