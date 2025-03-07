import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
    },
    {
        path: "/register",
        element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense>,
    },
    {
        path: "/products",
        element: <Suspense fallback={<div>Loading...</div>}><Product /></Suspense>,
    },
    // {
    //     path: "/checkout",
    //     element: <Suspense fallback={<div>Loading...</div>}><Checkout/></Suspense>
    // },
    {
        path: "*",
        element: <Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
    }
]);

export default router;

