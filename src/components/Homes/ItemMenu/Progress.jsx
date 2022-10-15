import React from "react";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const box1Style = {
  float: 'right', 
  marginBottom: '32px',
  position: 'relative', 
  display: 'inline-flex' 
}

const box2Style = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const CircularProgressWithLabel = (props) => {

  return (
    <Box sx={box1Style}>
      <CircularProgress variant="determinate" {...props} />
      <Box sx={box2Style}>
        <Typography 
          variant="caption" 
          component="div" 
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Progress = (props) => {
  const checkLists = props.item.checkLists.length;

  const checkedLists = props.item.checkLists.filter(check => {
    return (check.isCheck)
  }).length

  const value = Math.floor(checkedLists / checkLists * 100)

  if(value === 0 || !value){return []}

  return <CircularProgressWithLabel value={value} />;
}

export default Progress;