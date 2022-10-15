import React from "react";
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const CreateListField = (props) => {

  const inputStyle = { 
    ml: 1,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '4px', 
    padding: '4px 8px',
    margin: '4px auto',
  }

  return (
    <div>
    <Paper
      onSubmit={(e) => props.createList(e)}
      onChange={(e) =>props.updateText(e)}
      component="form"
      sx={{display: 'flex'}}
    >
        
      <InputBase
        sx={inputStyle}
        value={props.value}
        fullWidth
        placeholder="リスト名を入力"
        autoFocus
      />
          <IconButton 
          type="button" 
          sx={{ p: '10px' }} 
          aria-label="pencil"
          onClick={(e) => props.createList(e)}
        >
          <EditIcon />
        </IconButton>
        </Paper>
      
        <div className="add-list-button">
          <p onClick={(e) => props.createList(e)}>
            リストを追加
          </p>
          <span onClick={props.createListToggle}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        
    </div>
  )
}

export default CreateListField;