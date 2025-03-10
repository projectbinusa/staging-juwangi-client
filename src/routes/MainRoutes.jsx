import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout"; 

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../pages/ListUser"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Semua halaman di sini akan punya Sidebar
        children: [
            { path: "products", element: <Product /> },
            { path: "user", element: <ListUser /> },
            { path: "*", element: <ErrorPage /> }, // Error Page tanpa sidebar? Pindahkan ke luar
        ],
    },
    { path: "login", element: <Login /> }, // Login dan Register di luar Layout (tanpa Sidebar)
    { path: "register", element: <Register /> },
]);

export default router;
