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
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favoriteSong_route_1 = require("./favoriteSong.route");
const search_route_1 = require("./search.route");
const account_route_1 = require("./account.route");
const accountMidllerware = __importStar(require("../../middlerware/account.middlerware"));
const routeClient = (app) => {
    app.use("/topics", accountMidllerware.checkToken, topic_route_1.topicRoutes);
    app.use("/songs", accountMidllerware.checkToken, song_route_1.songRoutes);
    app.use("/favorite-songs", accountMidllerware.checkToken, favoriteSong_route_1.favoriteSongRoutes);
    app.use("/search", accountMidllerware.checkToken, search_route_1.searchRoutes);
    app.use("/accounts", account_route_1.accountRoutes);
};
exports.default = routeClient;
