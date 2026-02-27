import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export const router= createBrowserRouter([
    {
        path:"/",
        Component: Login,
    },
    {
        path:"/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>
    }
])