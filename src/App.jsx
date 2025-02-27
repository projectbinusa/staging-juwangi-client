// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./notfound/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/e-commerce/Product";
import AddProduct from "./pages/e-commerce/AddProduct"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
