import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout"; 

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../pages/ListUser"));
const Cart = lazy(() => import("../pages/e-commerce/Cart"))
const AddProduct = lazy(() => import("../pages/e-commerce/AddProduct"))
const EditProduct = lazy(() => import("../pages/e-commerce/EditProduct"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Semua halaman di sini akan punya Sidebar
        children: [
            { path: "products", element: <Product /> },
            { path: "user", element: <ListUser /> },
            { path: "cart", element: <Cart/>},
            // { path: "profile", element: <ProfilePage /> },
            { path: "*", element: <ErrorPage /> },
            { path: "*", element: <ErrorPage /> }, // Error Page tanpa sidebar? Pindahkan ke luar
        ],
    },
    { path: "login", element: <Login /> }, // Login dan Register di luar Layout (tanpa Sidebar)
    { path: "register", element: <Register /> },
    { path: "addproduct", element: <AddProduct /> },
    { path: "editproduct/:id", element: <EditProduct /> },
]);

export default router;
