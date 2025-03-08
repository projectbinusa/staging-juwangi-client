import { createBrowserRouter } from "react-router-dom";
import { lazy} from "react";
import Layout from "../component/sidebar/Layout"; 

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../pages/ListUser"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            { path: "products", element: <Product /> },
            { path: "*" ,element: <ErrorPage/>},
        ],
    },
    {
        path: "/",
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "user", element: <ListUser/>}
        ]
    }
]);

export default router;

