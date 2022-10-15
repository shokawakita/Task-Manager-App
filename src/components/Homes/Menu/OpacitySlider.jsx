import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const OpacitySlider = (props) => {  
 
  return (
    <Box width={150}>
      <span style={{fontSize: '12px'}}>透明度</span>
      <Slider
        size="small"
        defaultValue={100}
        onChange={(e) => props.opacityAdjust(e)}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}

export default OpacitySlider;