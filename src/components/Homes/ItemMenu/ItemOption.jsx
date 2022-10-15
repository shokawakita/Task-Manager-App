import React from 'react';
import {SelectLabels} from './index';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {date} from '../../../functions/index'

const ItemOption = (props) => {
  // アイテムメニューのコメント保存のための関数
  const updateComment = (e, currentItem) => {
    e.stopPropagation();
    e.preventDefault();

    const newBoards = props.boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        current: board.current,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color,
        isFavorite: board.isFavorite,
        time: (board.current ? date() : board.time),
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: list.current,
            items: list.items.map(item =>{
              return {
                id: item.id,
                name: item.name,
                label: item.label,
                current: item.current,
                edit: item.edit,
                checkLists: item.checkLists,
                time: (item.current ? date() : item.time),
                comment: (item === currentItem ? e.target.value : item.comment),
              }
            })
          }
        })
      }
    })
    props.setBoards(newBoards);
    props.setValue("")
  }

  // Box style
  const boxStyle = {
    '& .MuiTextField-root': { 
      m: "32px", 
      width: '500px', 
      display: 'flex',}
  }

  // p style
  const pStyle = {
    fontSize: '.9rem', 
    margin: '32px 32px 0 32px',
    userSelect: 'none',
  }

  return (
    <Box
      component="form"
      sx={boxStyle}
      noValidate
      autoComplete="off"
    >
      <div style={{fontSize: '.8rem', color: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'right', padding: '8px 32px 0 0'}}>
        <p>更新日時: </p>
        <p>{props.item.time.toLocaleString()}</p>
      </div>

      <label className="item-comment">
        <p style={pStyle}>コメントを記入する</p>
      
        <TextField
          label="コメント"
          multiline
          defaultValue={props.item.comment}
          rows={4}
          placeholder="コメントを書く"
          onClick={props.handleClose}
          onChange={(e) => props.updateText(e)}
          onBlur={(e) => updateComment(e, props.item)}
          onCompositionStart={props.startComposition}
          onCompositionEnd={props.endComposition}
          onKeyDown={(e) => {
          if (e.key === "Enter") {
            if(props.composing){
              return;
            } else {
              e.target.blur()
              updateComment(e, props.item)
            }
          }}}
        />
      </label>

      <SelectLabels
        boards={props.boards}
        item={props.item}
        setBoards={props.setBoards}
        setSelectColor={props.setSelectColor}
        updateColor={props.updateColor}
      />
    </Box>
  )
}

export default ItemOption;