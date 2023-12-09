"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const routeAdmin = (app) => {
    const PATH_ADMIN = system_1.systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, topic_route_1.topicRoutes);
    app.use(`${PATH_ADMIN}/songs`, song_route_1.songRoutes);
    app.use(`${PATH_ADMIN}/upload`, upload_route_1.uploadRoutes);
};
exports.default = routeAdmin;
