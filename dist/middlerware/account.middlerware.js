"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const account_model_1 = __importDefault(require("../model/account.model"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies && req.cookies.token) {
        const account = yield account_model_1.default.findOne({
            token: req.cookies.token
        });
        res.locals.account = account;
        next();
    }
    else {
        res.redirect("/accounts/login");
    }
});
exports.checkToken = checkToken;
