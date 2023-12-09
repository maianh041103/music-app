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
exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const searchHelper = __importStar(require("../../helper/search.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let keyword = searchHelper.search(req.query.keyword.toString());
    let regex = new RegExp(keyword, "i");
    const style = req.params.style;
    let songs = yield song_model_1.default.find({
        $or: [
            { title: regex },
            { slug: regex }
        ]
    });
    let listSong = [];
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        });
        let newSong = {
            title: song.title,
            avatar: song.avatar,
            description: song.description,
            singerId: song.singerId,
            topicId: song.topicId,
            like: song.like,
            lyrics: song.lyrics,
            audio: song.audio,
            status: song.status,
            slug: song.slug,
            infoSinger: {
                fullName: singer.fullName
            }
        };
        listSong.push(newSong);
    }
    switch (style) {
        case "result":
            res.render('client/pages/search/result.pug', {
                pageTitle: "Kết quả tìm kiếm",
                songs: songs,
                keyword: req.query.keyword.toString()
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                pageTitle: "Kết quả tìm kiếm",
                songs: listSong,
                keyword: req.query.keyword.toString()
            });
            break;
        default:
            break;
    }
});
exports.index = index;
