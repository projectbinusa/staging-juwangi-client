// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import NotFound from "./component/NotFound";
// import User from "./pages/User";
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/user" element={<User />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
