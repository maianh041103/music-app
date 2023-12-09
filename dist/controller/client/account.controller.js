"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.loginPOST = exports.login = exports.registerPOST = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const generate = __importStar(require("../../helper/generate"));
const account_model_1 = __importDefault(require("../../model/account.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/accounts/register.pug', {
        pageTitle: "Đăng ký"
    });
});
exports.register = register;
const registerPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body["password"] = (0, md5_1.default)(req.body.password);
    req.body["token"] = generate.generateRandomString(30);
    const data = new account_model_1.default(req.body);
    yield data.save();
    res.cookie("token", data.token);
    res.redirect("/topics");
});
exports.registerPOST = registerPOST;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/accounts/login.pug', {
        pageTitle: "Đăng nhập"
    });
});
exports.login = login;
const loginPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const emailExisit = yield account_model_1.default.findOne({
        email: req.body.email
    });
    if (!emailExisit) {
        console.log("Email không tồn tại");
        res.redirect('back');
        return;
    }
    if ((0, md5_1.default)(req.body.password) === emailExisit.password) {
        res.cookie("token", emailExisit.token);
        res.redirect("/topics");
        return;
    }
    console.log("Mật khẩu không chính xác");
    res.redirect("back");
});
exports.loginPOST = loginPOST;
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/accounts/login");
};
exports.logout = logout;
