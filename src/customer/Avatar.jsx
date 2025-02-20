import { Avatar as MAvatar } from '@mui/material';
import PropTypes from 'prop-types';  // Impor PropTypes

const Avatar = ({ src, alt, size }) => {
  return <MAvatar src={src} alt={alt} sx={{ width: size, height: size }} />;
};

// Menambahkan validasi untuk props
Avatar.propTypes = {
  src: PropTypes.string.isRequired,   // src harus berupa string dan bersifat wajib
  alt: PropTypes.string.isRequired,   // alt harus berupa string dan bersifat wajib
  size: PropTypes.number.isRequired,  // size harus berupa angka dan bersifat wajib
};

export default Avatar;
