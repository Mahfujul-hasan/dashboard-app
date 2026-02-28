import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import Team from "../pages/Team";
import Setting from "../pages/Setting";
import Support from "../pages/Support";

export const router= createBrowserRouter([
    {
        path:"/",
        Component: Login,
    },
    {
        path:"/dashboard",
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                index:true,
                Component:Dashboard,
            },
            {
                path:"tasks",
                Component:Tasks,
            },
            {
                path:"calendar",
                Component:Calendar,
            },
            {
                path:"analytics",
                Component:Analytics,
            },
            {
                path:"team",
                Component:Team,
            },
            {
                path:"setting",
                Component:Setting,
            },
            {
                path:"support",
                Component:Support,
            },
        ]
        
    },
    
])