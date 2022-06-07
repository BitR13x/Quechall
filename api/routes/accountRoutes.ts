import express from 'express';
import { Request, Response } from "express";
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';

import { User } from "../src/entity/User";
import { jwtCreateAccessToken, jwtCreateRefreshToken, isAuth } from "../jwtokens";
import { inputValidate } from "../inputValidation";
import { MyDataSource } from "../../ormconfig";

const { saltRounds, production } = require('../../config.json');
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  var username: string = req.body.user;
  var password: string = req.body.password;
  if (username.includes("@")) {
    var [ message, value ] = inputValidate({
      email: username,
      password: password,
    });
  } else {
    var [ message, value ] = inputValidate({
      username: username,
      password: password,
    });
  }

  if (message){
    return res.status(422).send({ message: message });
  } else {
    (async () => {
      if (username.includes("@")){
        var user : User = await User.findOneBy({ email: value.email });
      } else {
        var user : User = await User.findOneBy({ userName: value.username });
      }
      if (!user) return res.status(403).send({ message: "Špatné přihlašovací jméno nebo heslo" });
      //! timing attack
      bcrypt.compare(value.password, user.hsPassword, (err, result) => {
        if (result == true) {
          //? setting tokens
          res.cookie("jid", jwtCreateRefreshToken(user), {
            httpOnly: true,
            secure: production, // false if using http
            sameSite: true
          }).cookie("accessToken", jwtCreateAccessToken(user), {
            httpOnly: true,
            secure: production,
            sameSite: true
          })
          return res.status(200).send({ message: "Úspěch" });
  
        } else {
          return res.status(403).send({ message: "Špatné heslo nebo přihlašovací jméno" });
        }
  
      });
    })();
  }

});

const createAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message:
        'Příliš mnoho požadavků posláno z této IP, zkuste to prosím znovu za hodinu',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


router.post('/register', createAccountLimiter, async (req: Request, res: Response) => {
  var email: string = req.body.email;
  var username: string = req.body.user;
  var password: string = req.body.password;

  var [ message, value ] = inputValidate({
    username: username,
    email: email,
    password: password,
  });

  if (message){
    return res.status(422).send({ message: message });
  } else {
    email = sanitizeHtml(value.email, { allowedTags: false,
      allowedAttributes: false });
    username = sanitizeHtml(value.username, { allowedTags: false,
      allowedAttributes: false });
    password = value.password;

    try {
      let userTest_user : User = await User.findOneBy({ userName: username });
      let userTest_email : User = await User.findOneBy({ email: email });
      if (userTest_email || userTest_user) return res.status(403).send({ message: "Uživatel už existuje" });
    } catch (e) {
      console.log(e);
    }
  
  
    bcrypt.hash(password, saltRounds, async (err, hash: string) => {
      if (err) {
        console.log(err);
      } else {
        User.create({
          role: "user",
          email: email,
          userName: username,
          hsPassword: hash
        }).save();
      }    
    });
  }
  return res.status(200).send({ message: "Úspěch" });
});

router.post("/logout", isAuth, (req: Request, res: Response) => {
  //@ts-ignore
  let userId = req.userId;
  if (!userId) {
    return res.status(401).send("Nejsi přihlášený/á");
  } else {
    MyDataSource.getRepository(User).increment({ id: userId }, 'tokenVersion', 1).then(() => {
      return res
        .clearCookie("accessToken")
        .clearCookie("jid")
        .status(200).send("Úspěšně odhlášený");
    })
  }
});

export { router as accountRoutes }