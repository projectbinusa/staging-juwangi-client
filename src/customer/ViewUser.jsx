// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import MainCard from '../customer/MainCard';

const ViewUser = () => {
  const { userId } = useParams();  // Mengambil ID pengguna dari URL params

  // Data pengguna, tidak perlu useState jika tidak ada perubahan data
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '+1 (123) 456-7890', status: 'Active', avatar: 'avatar-1.png' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '+1 (987) 654-3210', status: 'Inactive', avatar: 'avatar-2.png' },
    // data lainnya...
  ];

  // Cari pengguna berdasarkan ID
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return <div>User not found</div>;  // Menangani kasus jika user tidak ditemukan
  }

  return (
    <MainCard>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Contact: {user.contact}</p>
      <p>Status: {user.status}</p>
      <img src={`/images/${user.avatar}`} alt={user.name} />
    </MainCard>
  );
};

export default ViewUser;
