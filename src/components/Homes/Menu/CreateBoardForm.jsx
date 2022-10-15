import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const CreateBoardForm = (props) => {

  // Paper style
  const paperStyle = { 
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: '80%', 
    height: 32,
    marginRight: '32px', 
    backgroundColor: 'rgb(212, 239, 255, .5)',
  }

  return (
    <Paper
      component="form"
      onChange={props.updateText}
      onSubmit={(e) => props.createBoard(e)}
      sx={paperStyle}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="ボード名"
        autoFocus
        value={props.value}
      />
      <IconButton 
        type="button" 
        sx={{ p: '10px' }} 
        aria-label="pencil"
      >
        <EditIcon />
      </IconButton>
    </Paper>
  )
}

export default CreateBoardForm;

