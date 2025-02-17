// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";  
import { Card, CardContent, Typography } from "@mui/material";

const SummaryCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 200, textAlign: 'center', p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" color="primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,   
  value: PropTypes.string.isRequired,   
};

export default SummaryCard;
