import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";

const routeAdmin = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
}

export default routeAdmin;