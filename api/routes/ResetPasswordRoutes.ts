import express from 'express';
import { Request, Response } from "express";
import path from 'path';
import bcrypt from 'bcrypt';

import { MailForgottenPassword } from "../MailerNode";
import { jwtCreateAccessToken, isAuth } from "../jwtokens";
import { User } from "../src/entity/User";
import { inputValidate } from "../inputValidation";

const router = express.Router();
const { saltRounds, production } = require('../config.json');


router.post("/forgot-password", async (req: Request, res: Response) => {
  let { email } = req.body;
  if (email) {
    let user = await User.findOneBy({ email: email })
    if (user) MailForgottenPassword({sendTo: email, link: `https://hoffi-vzdelavani.eu/forgot/pswd/?id=${user.id}&token=${jwtCreateAccessToken(user)}`})
  }
  
  return res.status(404).sendFile(path.join(__dirname, '../jekyll/_site/404.html'));
});

router.post("/forgot-password/:userId/:accesstoken", async (req: Request, res: Response) => {
  let { userId, accesstoken } = req.params;
  if ( Number(userId) && accesstoken ) {
    if (await User.findOneBy({ id: Number(userId) })){
      res.cookie("accessToken", accesstoken, {
        httpOnly: true,
        secure: production,
        sameSite: true
      })
      return res.status(200).send({ message: "Uspěch! Teď si můžeš změnit heslo." });
    }
  }
  return res.status(404).sendFile(path.join(__dirname, '../jekyll/_site/404.html'));
});

router.post("/reset-password", isAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  let userId = req.userId;
  if (!userId) {
    return res.status(401).send({ message: "Nejsi přihlášený/á"});
  } else {
    var newPassword: string = req.body.newPassword;
    var [ message, value ] = inputValidate({
      password: newPassword,
    })
      
    if (message) {
      return res.status(422).send({ message: message });
    } else {
      let user : User = await User.findOneBy({id: userId})
      bcrypt.hash(value.newPassword, saltRounds, async (err, hash: string) => {
        if (err) {
          return res.status(500).send({ message: "Nečekaná chyba" }) 
        } else {
          user.hsPassword = hash;
          await user.save()
          return res.status(200).send({ message: "Úspěšně změněno" })
        }
      });
    };
  };
})
  
  
export { router as ResetPasswordRoutes }