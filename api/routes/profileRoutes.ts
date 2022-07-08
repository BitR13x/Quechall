import express from 'express';
import { Request, Response } from "express";
import { isAuth } from '../jwtokens';
import { User } from '../src/entity/User';
import bcrypt from "bcrypt";
import { inputValidate } from '../inputValidation';
import rateLimit from 'express-rate-limit';
import { Passwords } from '../src/entity/Passwords';
import { Notes } from '../src/entity/Notes';

const { saltRounds } = require('../../config.json');
const PasswordChangeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: false,
    legacyHeaders: false,
})

const router = express.Router();

router.post('/getProfilePrefs', isAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  let userId = req.userId;
  if (userId) {
      const user : User = await User.findOneBy({id: userId})
      if (!user) return res.status(401).send({message: "Your account doesn't exist!"});
      let ret_user = {userName: user.userName, passwordPrefs: user.passwdGen};
      return res.send({message: "Success", response: ret_user });
  } else {
      return res.status(401).send({message: "You're not logged in"});
  };
});

router.post('/change/password', PasswordChangeLimiter, isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId = req.userId;
    if (!userId) {
      return res.status(401).send({ message: "You're not logged in!"});
    } else {
      let oldPassword: string = req.body.oldPassword;
      let newPassword: string = req.body.newPassword;
      let [ message, value ] = inputValidate({
        password: oldPassword,
        newPassword: newPassword
      })

      if (message) {
        return res.status(422).send({ message: message });
      } else {
        let user : User = await User.findOneBy({id: userId}) as User;
        if (user) {
          bcrypt.compare(value.password, user.hsPassword, (err, result: boolean) => {
            if (result == true) {
              bcrypt.hash(value.newPassword, saltRounds, async (err, hash: string) => {
                user.hsPassword = hash;
                await user.save()
                return res.status(200).send({ message: "Changed successfully" })
              });
            } else {
              return res.status(401).send({ message: "Wrong password!" })
            }
          });
        };
      };
    };
});

router.post('/editGenPrefs', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId : number = req.userId;
    let { passwdlen, symbols, numbers, lowercase, uppercase } = req.body;
    if (!userId) {
        return res.status(401).send({ message: "You're not logged in!"});
    } else {
        const user : User = await User.findOneBy({id: userId});
        if (!user) {
            return res.status(404).send({message: "Account not found!"});
        } else {
            passwdlen = Math.abs(Number(passwdlen));
            if (passwdlen) {
                user.passwdGen = { passwdlen: passwdlen, symbols: symbols ? true : false, numbers: numbers ? true : false, 
                    lowercase: lowercase ? true : false, uppercase: uppercase ? true : false }
                await user.save()
                return res.status(200).send({message: "Success"});
            } else {
                return res.status(403).send({message: "Password length must be number!"});
            };
        };
    };
});

router.post('/delete/account', isAuth, async (req: Request, res: Response) => {
    //@ts-ignore
    let userId : number = req.userId;
    if (!userId) {
        return res.status(401).send({ message: "You're not logged in!"});
    } else {
        const user : User = await User.findOneBy({id: userId});
        if (!user) {
            return res.status(404).send({message: "Account not found!"});
        } else {
            const passwordsVault = await Passwords.find({where: {OwnerId: userId}});
            const NotesVault = await Notes.find({where: {OwnerId: userId}});
            if (passwordsVault) passwordsVault.map((passwd) => passwd.remove());
            if (NotesVault) NotesVault.map((note) => note.remove());
            await user.remove();
            return res.status(200).send({message: "Success"});
        };
    };
});


export { router as profileRoutes }