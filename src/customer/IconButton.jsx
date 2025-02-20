import { IconButton as MIconButton } from '@mui/material';
import PropTypes from 'prop-types';  // Impor PropTypes

const IconButton = ({ onClick, color, children }) => {
  return (
    <MIconButton color={color} onClick={onClick}>
      {children}
    </MIconButton>
  );
};

// Menambahkan validasi untuk props
IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,  // onClick harus berupa fungsi dan bersifat wajib
  color: PropTypes.string,             // color harus berupa string (opsional)
  children: PropTypes.node.isRequired // children bisa berupa elemen React dan bersifat wajib
};

export default IconButton;
