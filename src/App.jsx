// eslint-disable-next-line no-unused-vars
<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import UserList from './pages/UserList';  
import AddUser from './customer/AddUser';
import EditUser from './customer/Edit';
import ViewUser from './customer/ViewUser';
import NotFoundPage from './notfound/NotFound';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import NotFound from "./component/NotFound";
// import User from "./pages/User";
import Login from "./pages/Login"
import Register from "./pages/Register"
>>>>>>> bb8ea33f042d03fdbf5a88ba3ddd649cf58c3c5e

const App = () => {
  // State untuk menyimpan daftar pengguna
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '+1 (123) 456-7890', status: 'Active', avatar: 'avatar-1.png' },
    // Data pengguna lainnya
  ]);

  // Fungsi untuk menambahkan pengguna baru
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);  // Menambahkan pengguna baru ke state
  };

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<ProductsPage />} />
        <Route path="/userlist" element={<UserList users={users} />} />
        <Route path="/add" element={<AddUser addUser={addUser} />} />
        <Route path="/edit/:userId" element={<EditUser users={users} />} />
        <Route path="/view/:userId" element={<ViewUser users={users} />} />
        <Route path="*" element={<NotFoundPage />} />
=======
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/user" element={<User />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
>>>>>>> bb8ea33f042d03fdbf5a88ba3ddd649cf58c3c5e
      </Routes>
    </Router>
  );
};

export default App;
