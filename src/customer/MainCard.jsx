import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types'; 
const MainCard = ({ children }) => {
  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

MainCard.propTypes = {
  children: PropTypes.node.isRequired,  
};

export default MainCard;
