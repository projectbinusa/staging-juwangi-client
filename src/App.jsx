// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./notfound/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/e-commerce/CategoryPage";
import Layout from "./component/sidebar/Layout";
import ProfilePage from "./component/profil/ProfilePage";
import ListUser from "./pages/ListUser";
import Product from "./pages/e-commerce/product";
import AddProduct from "./pages/e-commerce/AddProduct"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          element={<Layout />} 
        >
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<ListUser />} />
        </Route>
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
