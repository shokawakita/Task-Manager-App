import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Box style
const boxStyle = {
  '& > :not(style)': {
    margin: '4px auto', 
    width: '240px'
}}

const CreateItemField = (props) => {

  return (
    <Box
      component="form"
      sx={boxStyle}
      noValidate
      autoComplete="off" 
      onChange={(e) => props.updateText(e)}
      onSubmit={() => props.createItem(e)}
      >
      <TextField 
        label="アイテム追加" 
        placeholder="このリストにアイテムを追加する"
        sx={{backgroundColor: 'white', borderRadius: '4px'}}
        inputProps={{style: {fontSize: 14}}}
        InputLabelProps={{style: {fontSize: 12}}}
        rows={3}
        multiline={true}
        autoFocus
        value={props.value}
        onBlur={props.createItemFieldClose}
        onCompositionStart={props.startComposition}
        onCompositionEnd={props.endComposition}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if(props.composing){
              return;
            } else {
              // エンターキー押下時の処理
              props.createItem(e);
              props.createItemFieldClose();
            }
        }}}
        
      />
      <div className="item-create-form">
        <span onClick={() => props.createItemFieldClose()}><i className="bi bi-x-lg"></i></span>
      </div>
    </Box>
  );
}

export default CreateItemField;