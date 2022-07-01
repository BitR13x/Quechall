import express, { Request, Response } from 'express';
import { isAuth } from '../jwtokens';
import { User } from '../src/entity/User';
import { Notes } from '../src/entity/Notes';
import { Passwords } from '../src/entity/Passwords';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', isAuth, (req: Request, res: Response) => {
    return res.send({message: "Welcome in vault!"});
});

router.post('/getPasswords', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (userId) {
        const passwordsCreds = await Passwords.find({where: {OwnerId: userId}});
        return res.send({message: "Success", response: passwordsCreds});
    } else {
        return res.status(401).send({message: "You're not logged in"});
    };
});

router.post('/passwd-save/:passid', isAuth, async (req: Request, res: Response) => {
    //? if not exist create else edit
    //@ts-ignore
    let userId = req.userId;
    let passid = String(req.params.passid);
    console.log(req.body)
    if (userId) {
        let {identifier, content} = req.body;
        if (passid !== "null") {
            const PasswdCred : Passwords = await Passwords.findOneBy({id: passid});
            if (!PasswdCred) {
                return res.status(404).send({message: "This doesn't exist!"});
            } else {
                if (PasswdCred.OwnerId === userId) {
                    PasswdCred.name = identifier;
                    PasswdCred.content = content;
                    PasswdCred.save();
                    return res.send({message: "Success"});
                } else {
                    //? You don't own this! && This doesn't exist!
                    return res.status(401).send({message: "You don't own this!"});
                };
            };
        } else {
            await Passwords.create({name: identifier, content: content, OwnerId: userId}).save();
            return res.send({message: "Success"});
        };
    } else {
        return res.status(401).send({message: "You're not logged in"});
    };
});

router.post('/passwd-delete/:passid', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    let passid = String(req.params.passid);
    if (!userId) return res.status(401).send({message: "You're not logged in"});
    if (!passid) return res.status(404).send({message: "This doesn't exist!"});

    const PasswdCred : Passwords = await Passwords.findOneBy({id: passid});
    if (PasswdCred && PasswdCred.OwnerId === userId ) {
        await PasswdCred.remove();
        return res.send({message: "Success"});
    } else {
        return res.status(401).send({message: "This doesn't exist!"});
    };
});

router.post('/getNotes', isAuth, (req: Request, res: Response) => {
    return res.send({message: "Welcome in vault!"});
});

router.post('/note-save/:noteid', isAuth, (req: Request, res: Response) => {
    return res.send({message: "Welcome in vault!"});
});

router.post('/note-delete/:noteid', isAuth, (req: Request, res: Response) => {
    return res.send({message: "Welcome in vault!"});
});

export { router as VaultRoutes }
