import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const routeAdmin = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_ADMIN}/topics`, topicRoutes);
  app.use(`${PATH_ADMIN}/songs`, songRoutes);
  app.use(`${PATH_ADMIN}/upload`, uploadRoutes);
}

export default routeAdmin;