import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const colors = [
  {name: "red", color1: 255, color2: 0, color3: 0, opacity: 1},
  {name: "blue", color1: 0, color2: 0, color3: 255, opacity: 1},
  {name: "yellow", color1: 255, color2: 255, color3: 0, opacity: 1},
  {name: "green", color1: 0, color2: 128, color3: 0, opacity: 1},
  {name: "brown", color1: 165, color2: 42, color3: 42, opacity: 1},
  {name: "orange", color1: 255, color2: 165, color3: 0, opacity: 1},
  {name: "lightblue", color1: 173, color2: 216, color3: 230, opacity: 1},
  {name: "lightgreen", color1: 144, color2: 238, color3: 144, opacity: 1},
  {name: "pink", color1: 255, color2: 192, color3: 203, opacity: 1},
  {name: "purple", color1: 128, color2: 0, color3: 128, opacity: 1},
  {name: "grey", color1: 128, color2: 128, color3: 128, opacity: 1},
];

const SelectColors = (props) => {
  const selectStyle = {
    backgroundColor: `rgba(${props.selectColor.color1}, ${props.selectColor.color2}, ${props.selectColor.color3}, ${props.selectOpacity})`,
  }
  
  const colorsItems = colors.map((color, index) => {

    // span style
    const spanStyle = {
      backgroundColor: `rgba(${color.color1}, ${color.color2}, ${color.color3}, ${props.selectOpacity})`,
      marginRight: '32px',
      height: '12px',
      width: '12px',
      color: 'black'
    }

    return (
      <MenuItem 
        key={index}
        value={color}
      > 
        <span style={spanStyle}></span>
        {color.name}
      </MenuItem>
    )
  }) 

  return (
    <Box sx={{width: '240px', mt: '32px'}}>
      <FormControl fullWidth>
        <InputLabel>Color</InputLabel>
        <Select
          style={selectStyle}
          value={props.selectColor}
          label="Color"
          onChange={(e) => props.updateColor(e)}
        >
          {colorsItems}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectColors;