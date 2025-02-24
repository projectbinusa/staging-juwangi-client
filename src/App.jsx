// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import UserList from './pages/UserList';  
import AddUser from './customer/AddUser';
import EditUser from './customer/Edit';
import ViewUser from './customer/ViewUser';
import NotFoundPage from './notfound/NotFound';
import NotFound from './notfound/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './component/profil/ProfilePage';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '+1 (123) 456-7890', status: 'Active', avatar: 'avatar-1.png' },
  ]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);  
  };

  return (
    <Router>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/userlist" element={<UserList users={users} />} />
            <Route path="/add" element={<AddUser addUser={addUser} />} />
            <Route path="/edit/:userId" element={<EditUser users={users} />} />
            <Route path="/view/:userId" element={<ViewUser users={users} />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
    </Router>
  );
};

export default App;
