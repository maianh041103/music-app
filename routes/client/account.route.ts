import express, { Router } from "express";
import * as controller from "../../controller/client/account.controller";
import * as auth from "../../middlerware/auth.middlerware";

const route: Router = express.Router();

route.get('/register', controller.register);

route.post('/register', auth.register, controller.registerPOST);

route.get('/login', controller.login);

route.post('/login', auth.login, controller.loginPOST);

route.get('/logout', controller.logout);

export const accountRoutes = route;