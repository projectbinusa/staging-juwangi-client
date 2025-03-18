import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from "@mui/material";

const CircularLoader = ({ size = 60, color = "primary", text = "Loading..." }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
    >
      <CircularProgress size={size} color={color} />
      <Typography mt={2} fontSize="1.1rem" color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

CircularLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string
};

export default CircularLoader;
