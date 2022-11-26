import express, { Request, Response } from 'express';
import { isAuth } from '../jwtokens';
import { customPasswords } from '../src/entity/customPasswords';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//! Generating passwords
router.post('/generate-passwd', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) return res.status(401).send({message: "You didn't specified token!"});

    let { name, length } = req.body;
    if (!name) name = uuidv4();
    if (!length) length = 16;

    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!?§~";
    let content = Array(length).fill(letters).map((x) => { return x[Math.floor(Math.random() * x.length)] }).join('');
    let password = customPasswords.create({name: name, content: content, OwnerId: userId});
    if (await password.save()) {
        return res.send({message: "Success!", passwordContent: password});
    } else {
        return res.send({message: "Error!", passwordContent: password});
    };
});

//! Returning passwords
router.post('/getPasswdByName/:name', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) return res.status(401).send({message: "You didn't specified token!"});
    
    let name = req.params.name;
    if (!name) return res.status(401).send({message: "You didn't specified token!"});

    let password = await customPasswords.findBy({ OwnerId: userId, name: name })
    if (password) {
        return res.send({message: "Success!", password: password});
    } else {
        return res.send({message: "Error!", password: null});
    };
    
});

router.post('/get-passwds', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) return res.status(401).send({message: "You didn't specified token!"});

    let { count } = req.body;
    let passwords = null
    if (count) {
        passwords = await customPasswords.find({ where: {OwnerId: userId}, take: count});
    } else {
        passwords = await customPasswords.findBy({ OwnerId: userId });
    };
    
    if (passwords) {
        return res.send({message: "Success!", passwords: passwords});
    } else {
        return res.send({message: "Error!", passwords: null});
    };
});

//! Creating passwords
router.post('/create-passwd', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) return res.status(401).send({message: "You didn't specified token!"});

    let { name, content } = req.body;
    if (!name || !content) return res.status(401).send({message: "You didn't specified name or content!"})

    let password = customPasswords.create({ name: name, content: content, OwnerId: userId });
    if (await password.save()) {
        return res.send({message: "Success!", password: password});
    } else {
        return res.send({message: "Error!", password: null});
    };
});

//! Deleting passwords
router.post('/delete-passwd/:id', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) return res.status(401).send({message: "You didn't specified token!"});

    let id = req.params.id;
    if (!id) return res.status(401).send({message: "You didn't specified ID!"});
    
    let password = await customPasswords.findOneBy({id: id})
    if (password.OwnerId === userId) {
        if (password.remove()) {
            return res.send({message: "Success!", deleted: id});
        } else {
            return res.status(401).send({message: "Error!"})
        };
    } else {
        return res.status(401).send({message: "You don't own this password"});
    };
});


export { router as customVaultRoutes }
