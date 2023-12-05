import { Request, Response } from "express";
import md5 from "md5";
import * as generate from "../../helper/generate";
import Account from "../../model/account.model";

//[GET] /accounts/register
export const register = async (req: Request, res: Response) => {
  res.render('client/pages/accounts/register.pug', {
    pageTitle: "Đăng ký"
  })
}

//[POST] /accounts/register
export const registerPOST = async (req: Request, res: Response) => {
  req.body["password"] = md5(req.body.password);
  req.body["token"] = generate.generateRandomString(30);
  const data = new Account(req.body);
  await data.save();
  res.cookie("token", data.token);
  res.redirect("/topics");
}

//[GET] /accounts/login
export const login = async (req: Request, res: Response) => {
  res.render('client/pages/accounts/login.pug', {
    pageTitle: "Đăng nhập"
  });
}

//[POST] /accounts/login
export const loginPOST = async (req: Request, res: Response) => {
  console.log(req.body);
  const emailExisit = await Account.findOne({
    email: req.body.email
  });
  if (!emailExisit) {
    console.log("Email không tồn tại");
    res.redirect('back');
    return;
  }
  if (md5(req.body.password) === emailExisit.password) {
    res.cookie("token", emailExisit.token);
    res.redirect("/topics");
    return;
  }
  console.log("Mật khẩu không chính xác");
  res.redirect("back");
}

//[GET] /accounts/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/accounts/login");
}



