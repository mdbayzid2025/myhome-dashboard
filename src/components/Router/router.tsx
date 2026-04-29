import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Shared/ErrorPage";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import NewPassword from "../auth/NewPassword";
import OTPVerifyPage from "../auth/OTPVerifyPage";
import AdminManage from "../dashboard/Admin/Admins";
import Bookings from "../dashboard/Booking/Bookings";
import AllCars from "../dashboard/Cars/AllCars";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import Hosts from "../dashboard/Hosts/Hosts";
import Notificatiion from "../dashboard/Notification/Notification";
import Settings from "../dashboard/Setting/Setting";
import Users from "../dashboard/Users/Users";
import Revenue from "../dashboard/Revenue/Revenue";
import Agents from "../dashboard/Agents/Agents";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <PrivateRoute> <MainLayout /></PrivateRoute>,
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },

            {
                path: "revenues",
                element: <Revenue />
            },
            {
                path: "cars",
                element: <AllCars />
            },
            {
                path: "hosts",
                element: <Hosts />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "agents",
                element: <Agents />
            },
            {
                path: "admins",
                element: <AdminManage />
            },
            {
                path: "bookings",
                element: <Bookings />
            },
            {
                path: "setting",
                element: <Settings />
            },
            {
                path: "notification",
                element: <Notificatiion />
            },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/otp-verify", element: <OTPVerifyPage /> },
    { path: "/new-password", element: <NewPassword /> },
])

export default router;