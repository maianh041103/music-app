import { Request, Response, NextFunction } from "express"
import Account from "../model/account.model"
export const checkToken = async (req: Request, res: Response, next: NextFunction) => {

  if (req.cookies && req.cookies.token) {
    const account = await Account.findOne({
      token: req.cookies.token
    });
    res.locals.account = account;
  }
  next();
}