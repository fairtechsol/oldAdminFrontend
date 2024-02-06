
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import ReportRoutes from "./reportRoutes";

export default function adminRoute() {
  return [AuthRoutes, MainRoutes, ReportRoutes]
}
