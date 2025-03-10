import { createBrowerRouter } from "react-router";
import Homepage from "../Pages/Homepage";

const router = createBrowerRouter([
  {
    path: "/",
    Component: Homepage,
  },
]);

export default router;
