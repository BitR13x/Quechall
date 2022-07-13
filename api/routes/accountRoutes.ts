import express from 'express';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';

import { User } from "../src/entity/User";
import { jwtCreateAccessToken, jwtCreateRefreshToken, isAuth } from "../jwtokens";
import { inputValidate } from "../inputValidation";
import { MyDataSource } from "../../ormconfig";

const { saltRounds, production } = require('../../config.json');
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  var username: string = req.body.username;
  var password: string = req.body.password;
  if (!username || !password) return res.status(401).send({message: "You must specify username and password!"})
  var [ message, value ] = inputValidate({
    username: username,
    password: password,
  });

  if (message) {
    return res.status(422).send({ message: message });
  } else {
      var user : User = await User.findOneBy({ userName: value.username }) as User;
      if (!user) return res.status(403).send({ message: "Wrong password or username!" });
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
          return res.status(200).send({ message: "Success" });
        } else {
          return res.status(403).send({ message: "Wrong password or username!" });
        }
      });
  }
});

const createAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message:
        'Too many accounts created from this IP, please try again after an hour',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/register', createAccountLimiter, async (req: Request, res: Response) => {
  var username: string = req.body.username;
  var password: string = req.body.password;
  var masterpass : string = req.body.masterpass;
  if (!username || !password || !masterpass) return res.status(401).send({message: "You must specify username, password and master password!"});
  var [ message, value ] = inputValidate({
    username: username,
    password: password,
    masterpass: masterpass
  });

  if (message){
    return res.status(422).send({ message: message });
  } else {
    username = value.username;
    password = value.password;
    masterpass = value.masterpass;
    let userTest_user : User = await User.findOneBy({ userName: username }) as User;
    if (userTest_user) return res.status(403).send({ message: "User already exist" });

    bcrypt.hash(masterpass, saltRounds, (err, hsMasterPass: string) => {
      if (err) {
        console.warn(err);
        return res.status(422).send({ message: "Something went wrong!"});
      } else {
        bcrypt.hash(password, saltRounds, (err, hsPassword: string) => {
          if (err) {
            console.warn(err);
            return res.status(422).send({ message: "Something went wrong!"});
          } else {
            User.create({
              role: "user",
              userName: username,
              hsPassword: hsPassword,
              hsMasterPass: hsMasterPass
            }).save();
            return res.status(200).send({ message: "Success" });
          };
        });
      }
    });
  };
});

router.post("/checkMasterPass", isAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  let userId = req.userId;
  let masterpass = req.body.masterpass;
  if (!userId) {
    return res.status(401).send({ message: "You're not logged in!" });
  } else {
    if (!masterpass) return res.status(422).send({ message: "Master password cannot be empty!"});
    let [ message, value ] = inputValidate({
      masterpass: masterpass,
    });
    if (message) {
      return res.status(422).send({ message: message });
    } else {
      let user : User = await User.findOneBy({ id: userId }) as User;
      const isValid = await bcrypt.compare(value.masterpass, user.hsMasterPass);
      if (!isValid) return res.status(403).send({ message: "Incorrect Master Password!"});
      return res.status(200).send({ message: "Success" });
    };
  };
});

router.post("/logout", isAuth, (req: Request, res: Response) => {
  //@ts-ignore
  let userId = req.userId;
  if (!userId) {
    return res.status(401).send({ message: "You're not logged in!" });
  } else {
    MyDataSource.getRepository(User).increment({ id: userId }, 'tokenVersion', 1).then(() => {
      return res
        .clearCookie("accessToken")
        .clearCookie("jid")
        .status(200).send({ message: "Successfully logged off" });
    })
  }
});

export { router as accountRoutes }