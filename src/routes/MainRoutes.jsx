import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout";
import { ThemeContextProvider } from "../ThemeContext";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const ErrorPage = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../component/user/ListUser"));
const AddUser = lazy(() => import("../component/user/AddUser"));
const ViewUser = lazy(() => import("../component/user/ViewUser"));
const Cart = lazy(() => import("../pages/e-commerce/Cart"));
const AddProduct = lazy(() => import("../pages/e-commerce/AddProduct"));
const EditProduct = lazy(() => import("../pages/e-commerce/EditProduct"));
const ProfilePage = lazy(() => import("../component/profil/ProfilePage"));
const AdminList = lazy(() => import("../component/admin/AdminList"));
const AddAdmin = lazy(() => import("../component/admin/AddAdmin"));
const EditAdmin = lazy(() => import("../component/admin/EditAdmin"));
const Category = lazy(() => import("../component/category/Category"));
const AddCategory = lazy(() => import("../component/category/AddCategory"));
const EditCategory = lazy(() => import("../component/category/EditCategory"));
const OrderList = lazy(() => import("../pages/e-commerce/OrderList"));
const Analytics = lazy(() => import("../component/Dashboard/Analytics"));
const Grafik = lazy(() => import("../component/Dashboard/Grafik"))
const CreateInvoice = lazy(() => import("../sections/e-commerce/invoice/CreateInvoice"));
const Test = lazy(() => import("../test/test"));


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ThemeContextProvider>
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
            { path: "addadmin", element: <AddAdmin /> },
            { path: "addcategory", element: <AddCategory/>},
            { path: "editcategory", element: <EditCategory/>},
            { path: "editadmin/:id", element: <EditAdmin /> },
            { path: "category", element: <Category /> },
            { path: "*", element: <ErrorPage /> },
            { path: "orders", element: <OrderList /> },
            { path: "analytics", element: <Analytics /> },
            { path: "grafik", element: <Grafik /> },
            { path: "createInvoice", element: <CreateInvoice/>},
            { path: "test", element: <Test/>}
        ],
        
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "addproduct", element: <AddProduct /> },
    { path: "editproduct/:id", element: <EditProduct /> },
]);

export default router;
