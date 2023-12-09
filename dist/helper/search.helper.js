"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const search = (keyword) => {
    const stringUnidecode = (0, unidecode_1.default)(keyword.trim());
    let slug = stringUnidecode.replace(/\s+/g, "-");
    return slug;
};
exports.search = search;
