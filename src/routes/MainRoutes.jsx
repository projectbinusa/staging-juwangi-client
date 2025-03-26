import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../component/sidebar/Layout";
import { ThemeContextProvider } from "../ThemeContext";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Product = lazy(() => import("../pages/e-commerce/Product"));
const NotFound = lazy(() => import("../notfound/NotFound"));
const ListUser = lazy(() => import("../component/user/ListUser"));
const AddUser = lazy(() => import("../component/user/AddUser"));
const ViewUser = lazy(() => import("../component/user/ViewUser"));
const Cart = lazy(() => import("../pages/e-commerce/Cart"));
const AddProduct = lazy(() => import("../pages/e-commerce/AddProduct"));
const ProfilePage = lazy(() => import("../component/profil/ProfilePage"));
const AdminList = lazy(() => import("../component/admin/AdminList"));
const AddAdmin = lazy(() => import("../component/admin/AddAdmin"));
const EditAdmin = lazy(() => import("../component/admin/EditAdmin"));
const Category = lazy(() => import("../component/category/Category"));
const AddCategory = lazy(() => import("../component/category/AddCategory"));
const EditCategory = lazy(() => import("../component/category/EditCategory"));
const OrderList = lazy(() => import("../pages/e-commerce/OrderList"));
const Analytics = lazy(() => import("../component/Dashboard/Analytics"));
const Grafik = lazy(() => import("../component/Dashboard/Grafik"));
const Chart = lazy(() => import("../component/chart/Chart"));
const Data = lazy(() => import("../component/Dashboard/Data"));
const CreateInvoice = lazy(() => import("../sections/e-commerce/invoice/CreateInvoice"));
const ListInvoice = lazy(() => import("../sections/e-commerce/invoice/ListInvoice"));
const ProductList = lazy(() => import("../pages/e-commerce/ProductList"));



const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ThemeContextProvider>
                <Layout />
            </ThemeContextProvider>
        ),
        children: [
            { path: "productlist", element: <ProductList />},
            { path: "addproduct", element: <AddProduct /> },
            { path: "user", element: <ListUser /> },
            { path: "adduser", element: <AddUser /> },
            { path: "viewuser/:id", element: <ViewUser /> },
            { path: "cart", element: <Cart /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "admin", element: <AdminList /> },
            { path: "addadmin", element: <AddAdmin /> },
            { path: "addcategory", element: <AddCategory/>},
            { path: "editcategory/:id", element: <EditCategory/>},
            { path: "editadmin/:id", element: <EditAdmin /> },
            { path: "category", element: <Category /> },
            { path: "orders", element: <OrderList /> },
            { path: "analytics", element: <Analytics /> },
            { path: "grafik", element: <Grafik /> },
            { path: "data", element: <Data /> },
            { path: "chart", element: <Chart /> },
            { path: "createInvoice", element: <CreateInvoice/>},
            { path: "listinvoice", element: <ListInvoice/>}
        ],
        
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "products", element: <Product /> },
    { path: "*", element: <NotFound /> },
]);

export default router;
