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
exports.listen = exports.favoriteSong = exports.like = exports.songDetail = exports.detail = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favorite_model_1 = __importDefault(require("../../model/favorite.model"));
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slug,
        deleted: false
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    });
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");
        if (singer) {
            song["infoSinger"] = singer;
        }
    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.detail = detail;
const songDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        slug: req.params.slug,
        deleted: false,
        status: "active"
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId
    }).select("title");
    const favoriteSong = yield favorite_model_1.default.findOne({
        songId: song.id,
        userId: res.locals.account.id
    });
    let isFavorite = favoriteSong ? "active" : "";
    let isLike = song.like.find(accountId => {
        return accountId === res.locals.account.id;
    });
    if (isLike) {
        isLike = "active";
    }
    else {
        isLike = "";
    }
    res.render("client/pages/songs/detail.pug", {
        pageTitle: song.title,
        song: song,
        topic: topic,
        singer: singer,
        isFavorite: isFavorite,
        isLike: isLike
    });
});
exports.songDetail = songDetail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeLike = req.params.typeLike;
        const idSong = req.params.idSong;
        if (typeLike == "like") {
            const isLike = yield song_model_1.default.findOne({
                _id: idSong,
                like: res.locals.account.id
            });
            if (!isLike) {
                yield song_model_1.default.updateOne({
                    _id: idSong
                }, {
                    $push: { like: res.locals.account.id }
                });
            }
        }
        else {
            yield song_model_1.default.updateOne({
                _id: idSong
            }, {
                $pull: { like: res.locals.account.id }
            });
        }
        const song = yield song_model_1.default.findOne({
            _id: idSong
        });
        res.json({
            code: 200,
            like: song.like.length
        });
    }
    catch (error) {
        res.json({
            code: 400
        });
    }
});
exports.like = like;
const favoriteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeFavorite = req.params.typeFavorite;
        const songId = req.params.songId;
        switch (typeFavorite) {
            case "favorite":
                const data = {
                    songId: songId,
                    userId: res.locals.account.id
                };
                const favoriteSong = new favorite_model_1.default(data);
                yield favoriteSong.save();
                break;
            case "unfavorite":
                yield favorite_model_1.default.deleteOne({
                    songId: songId,
                    userId: res.locals.account.id
                });
                break;
            default:
                break;
        }
        res.json({
            code: 200,
            message: "Thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        });
    }
});
exports.favoriteSong = favoriteSong;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const song = yield song_model_1.default.findOne({
            _id: songId
        });
        yield song_model_1.default.updateOne({
            _id: songId
        }, {
            listen: (song.listen || 0) + 1
        });
        const newSong = yield song_model_1.default.findOne({
            _id: songId
        });
        res.json({
            code: 200,
            message: "Thành công",
            listen: newSong.listen
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Thất bại"
        });
    }
});
exports.listen = listen;
