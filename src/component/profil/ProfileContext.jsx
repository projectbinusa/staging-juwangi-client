// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; 

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || ''); 
  const [profileName, setProfileName] = useState(localStorage.getItem('profileName') || 'Francois');
  const [profileJob, setProfileJob] = useState(localStorage.getItem('profileJob') || 'Full Stack Developer');

  return (
    <ProfileContext.Provider value={{
      profileImage, setProfileImage,
      profileName, setProfileName,
      profileJob, setProfileJob
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProfile = () => useContext(ProfileContext);
