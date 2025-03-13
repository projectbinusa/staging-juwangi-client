import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout";
import { ThemeContextProvider } from "../ThemeContext";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../component/user/ListUser"));
const Cart = lazy(() => import("../pages/e-commerce/Cart"));
const AddProduct = lazy(() => import("../pages/e-commerce/AddProduct"));
const EditProduct = lazy(() => import("../pages/e-commerce/EditProduct"));
const ProfilePage = lazy(() => import("../component/profil/ProfilePage"));
const AdminList = lazy(() => import("../component/admin/AdminList"));
const AddUser = lazy(() => import("../component/user/AddUser"));
const ViewUser = lazy(() => import("../component/user/ViewUser"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ThemeContextProvider> {/* Tambahkan ThemeContextProvider di sini */}
                <Layout />
            </ThemeContextProvider>
        ),
        children: [
            { path: "products", element: <Product /> },
            { path: "user", element: <ListUser /> },
            { path: "adduser", element: <AddUser /> },
            { path: "viewuser/:id", element: <ViewUser /> },
            { path: "cart", element: <Cart /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "admin", element: <AdminList /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "addproduct", element: <AddProduct /> },
    { path: "editproduct/:id", element: <EditProduct /> },
]);

export default router;
