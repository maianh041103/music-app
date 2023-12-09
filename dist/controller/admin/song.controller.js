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
exports.editPATCH = exports.edit = exports.createPOST = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/index.pug", {
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            singerId: req.body.singerId,
            topicId: req.body.topicId,
            status: req.body.status,
            lyrics: req.body.lyrics
        };
        if (req.body.avatar) {
            data["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            data["audio"] = req.body.audio[0];
        }
        const newSong = new song_model_1.default(data);
        yield newSong.save();
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error);
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.createPOST = createPOST;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield song_model_1.default.findOne({
            _id: req.params.id
        });
        const singers = yield singer_model_1.default.find({
            deleted: false
        });
        const topics = yield topic_model_1.default.find({
            deleted: false
        });
        res.render("admin/pages/songs/edit", {
            pageTitle: "Chỉnh sửa bài hát",
            dataSong: song,
            singers: singers,
            topics: topics
        });
    }
    catch (error) {
        console.log(error);
        res.redirect("back");
    }
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            singerId: req.body.singerId,
            topicId: req.body.topicId,
            status: req.body.status,
            lyrics: req.body.lyrics
        };
        if (req.body.avatar) {
            req.body["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            req.body["audio"] = req.body.audio[0];
        }
        console.log(data);
        const id = req.params.id;
        yield song_model_1.default.updateOne({
            _id: id
        }, req.body);
        res.redirect('back');
    }
    catch (error) {
        console.log(error);
        res.redirect('back');
    }
});
exports.editPATCH = editPATCH;
