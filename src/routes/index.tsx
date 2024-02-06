import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../config";
import adminroute from "./adminRoutes";
import walletRoute from "./walletRoutes";

export default function routes(role: any) {
  return createBrowserRouter(role === "admin" ? adminroute() : walletRoute(), {
    basename: config.BASE_NAME,
  });
}
