import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: '560px',
  bgcolor: 'background.paper',
  height: '400px',
  overflowY: 'scroll',
};

const alertStyle = {margin: '24px 32px'}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
}

const ActiveBoards = (props) => {
  
  const setDateTime = new Date();
  setDateTime.setDate(setDateTime.getDate() - 3)

  const filterBoards = props.boards.filter(board => {
    const activeTime = Date.parse(setDateTime.toLocaleString())
    const boardTime = Date.parse(board.time.toLocaleString())
    return (boardTime - activeTime > 0)
  })

  const saveBoards = filterBoards.map(board => {
    return {
      id: board.id, title: board.title, color: board.color, opacity: board.opacity, isFavorite: board.isFavorite, time: board.time, lists: board.lists, edit: board.edit,
    }
  })
  
  //  順番を更新したものが一番上に来るようにする
  saveBoards.sort(function(a, b){
    if(Date.parse(a.time.toLocaleString()) > Date.parse(b.time.toLocaleString())){return 1}
    else if(Date.parse(a.time.toLocaleString()) < Date.parse(b.time.toLocaleString())){return -1}
    else {return 0}
  })
  saveBoards.reverse();

  const activeBoards = saveBoards.map(board => {
    if(board === []){
      return (<div style={alertStyle}>ボードを追加してください</div>)
    }

    const boardStyle = {
      backgroundColor: `rgba(${board.color.color1}, ${board.color.color2}, ${board.color.color3}, ${board.opacity}`,
      width: '20px',
      height: '20px',
      marginLeft: '32px',
    }

    return (
      <ListItem button divider
      key={board.id}
      style={listItemStyle}
      onClick={() => {
        props.currentBoard(board)
        props.recentlyListClose()
      }}
      >
        <Divider light/>
        <span style={boardStyle}></span>
        <ListItemText primary={board.title}></ListItemText>
        <span><i className={(board.isFavorite ? "bi bi-star-fill" : "bi bi-star")}></i></span>
        <span style={{fontSize: '.7rem'}}>{`更新時間: ${board.time.toLocaleString()}`}</span>
      </ListItem>
    )
  })  
  return (
    <>
      <DialogTitle sx={{padding: '32px'}}>
      最近使用したボード（過去3日間）
    </DialogTitle>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {activeBoards}
      </List>
    </>
  )
}

export default ActiveBoards;