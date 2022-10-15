import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {date} from '../../../functions/index';

// selectable colors
const colors = [
  {name: 'silver'},{name: 'chocolate'},{name: 'mediumvioletred'}, {name: 'orangered'}, {name: 'hotpink'}, {name: 'gold'},{name: 'limegreen'}, {name: 'deepskyblue'}, {name: 'unset'},
]

// p style
const pStyle = {
  margin: "12px 0",
  whiteSpace: 'nowrap',
  userSelect: 'none',
}

// Box style
const boxStyle = { 
  m: '32px',
  display: 'flex',
  gap: '32px',
}

const SelectLabels = (props) => { 
  
  const updateLabel = (e) => {
    const newBoards = props.boards.map(board => {
      return {
        id: board.id, title: board.title, opacity: board.opacity, edit: board.edit, isFavorite: board.isFavorite, color: board.color, current: board.current, 
        time: (board.current ? date() : board.time),
        lists: board.lists.map(list => {
          return list.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              label: item.label,
              current: item.current,
              comment: item.comment, 
              edit: item.edit,
              checkLists: item.checkLists,
              time: (item.current ? date() : item.time),
            }
          })
        })
      }
    })
    props.item.label = e.target.value;
    props.setSelectColor("")
    props.setBoards(newBoards)
  }
  
  const labels = colors.map((label, index) => {
    
    // span style
    const spanStyle = {
      backgroundColor: `${label.name}`,
      marginRight: '32px',
      height: '12px',
      width: '12px',
      color: 'black'
    }

    return (
      <MenuItem 
        key={index}
        value={label.name}
      > 
        <span style={spanStyle}></span>
        {label.name}
      </MenuItem>
    )
  }) 
    

  return (
    <Box sx={boxStyle}>
      <p style={pStyle}>
        ラベルカラー</p>
      <FormControl fullWidth>
        <InputLabel>Color</InputLabel>
        <Select
          style={{backgroundColor: `${props.item.label}`}}
          value=""
          label="Color"
          onChange={(e) => {
            props.updateColor(e)
            updateLabel(e);
          }}
        >
          {labels}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLabels;