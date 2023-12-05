import { Request, Response, NextFunction } from "express";
import Account from "../model/account.model";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  if (!email) {
    res.redirect('back');
  }
  const emailExisit = await Account.findOne({
    email: email
  });
  if (!emailExisit) {
    next();
  } else {
    res.redirect('back');
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  if ((!email) || (!password)) {
    res.redirect('back');
  } else {
    next();
  }
}