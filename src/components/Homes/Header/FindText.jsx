import React, {useState} from "react";
import {SearchResult} from './index'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const FindText = (props) => {

  const paperStyle = { 
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: 400, 
    height: 32,
    marginRight: '32px', 
  }

  return (
    <div>
      <Paper
        component="form"
        sx={paperStyle}>
        <InputBase
          type="text"
          sx={{ ml: 1, flex: 1 }}
          placeholder="検索"
          onInput={(e) => {
            props.setFind(true)
            props.updateKeyword(e)
        }}/>
        <IconButton 
          type="button" 
          sx={{ p: '10px' }} 
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <SearchResult 
        boards={props.boards}
        keyword={props.keyword}
        find={props.find}
        setFind={props.setFind}
        setKeyword={props.setKeyword}
        closeSlideOut={props.closeSlideOut}
        currentBoard={props.currentBoard}
        currentList={props.currentList}
        currentItem={props.currentItem}
      />
    </div>
  )
}

export default FindText;