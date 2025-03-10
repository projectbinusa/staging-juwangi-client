import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout"; 
import ProfilePage from "../component/profil/ProfilePage";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../pages/ListUser"));
const Cart = lazy(() => import("../pages/e-commerce/Cart"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "products", element: <Product /> },
            { path: "user", element: <ListUser /> },
            { path: "cart", element: <Cart/>},
            { path: "profile", element: <ProfilePage /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
    { path: "login", element: <Login /> }, 
    { path: "register", element: <Register /> },
]);

export default router;
