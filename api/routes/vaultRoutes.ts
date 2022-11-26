import express, { Request, Response } from 'express';
import { isAuth } from '../jwtokens';
import { Notes } from '../src/entity/Notes';
import { Passwords } from '../src/entity/Passwords';

const router = express.Router();

router.post('/', isAuth, (req: Request, res: Response) => {
    return res.send({message: "Welcome in vault!"});
});


//! Passwords
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
    //@ts-ignore
    let userId = req.userId;
    let passid = String(req.params.passid);
    if (userId) {
        let {identifier, content} = req.body;
        if (passid !== "null") {
            const PasswdCred : Passwords = await Passwords.findOneBy({id: passid});
            if (!PasswdCred) {
                return res.status(404).send({message: "This doesn't exist!", newCard: undefined});
            } else {
                if (PasswdCred.OwnerId === userId) {
                    PasswdCred.name = identifier;
                    PasswdCred.content = content;
                    PasswdCred.save();
                    return res.send({message: "Success", newCard: PasswdCred});
                } else {
                    //? You don't own this! && This doesn't exist!
                    return res.status(401).send({message: "You don't own this!", newCard: undefined});
                };
            };
        } else {
            const PasswdCred : Passwords = await Passwords.create({name: identifier, content: content, OwnerId: userId}).save();
            return res.send({message: "Success", newCard: PasswdCred});
        };
    } else {
        return res.status(401).send({message: "You're not logged in", newCard: undefined});
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


//! Notes
router.post('/getNotes', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (userId) {
        const NotesVault = await Notes.find({where: {OwnerId: userId}});
        return res.send({message: "Success", response: NotesVault});
    } else {
        return res.status(401).send({message: "You're not logged in"});
    };
});

router.post('/note-save/:noteid', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    let noteid = String(req.params.noteid);
    if (userId) {
        let {name, content} = req.body;
        if (noteid !== "null") {
            const NoteVault : Notes = await Notes.findOneBy({id: noteid});
            if (!NoteVault) {
                return res.status(404).send({message: "This doesn't exist!", newCard: undefined});
            } else {
                if (NoteVault.OwnerId === userId) {
                    NoteVault.name = name;
                    NoteVault.content = content;
                    NoteVault.save();
                    return res.send({message: "Success", newCard: NoteVault});
                } else {
                    //? You don't own this! && This doesn't exist!
                    return res.status(401).send({message: "You don't own this!", newCard: undefined});
                };
            };
        } else {
            const NoteVault : Notes = await Notes.create({name: name, content: content, OwnerId: userId}).save();
            return res.send({message: "Success", newCard: NoteVault});
        };
    } else {
        return res.status(401).send({message: "You're not logged in", newCard: undefined});
    };
});

router.post('/note-delete/:noteid', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    let noteid = String(req.params.noteid);
    if (!userId) return res.status(401).send({message: "You're not logged in"});
    if (!noteid) return res.status(404).send({message: "This doesn't exist!"});

    const NotesVault : Notes = await Notes.findOneBy({id: noteid});
    if (NotesVault && NotesVault.OwnerId === userId ) {
        await NotesVault.remove();
        return res.send({message: "Success"});
    } else {
        return res.status(401).send({message: "This doesn't exist!"});
    };
});

export { router as VaultRoutes }
