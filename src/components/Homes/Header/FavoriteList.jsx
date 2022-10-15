import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


const style = {
  width: '100%',
  maxWidth: '560px',
  bgcolor: 'background.paper',
  overflowY: 'scroll',
};

const alertStyle = {margin: '24px 32px'}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
}

const FavoriteList = (props) => {
  
  const favoBoards = props.boards.filter(board => {
    if(!board.isFavorite){[]}
    return (board.isFavorite)
  })

  const items = (favoBoards === [] ? 
  // お気に入りリストがあるかどうかで場合分け
  <div style={alertStyle}>お気に入りリストを追加してください</div> : 
  (!favoBoards[0] ? 
  <div style={alertStyle}>お気に入りリストを追加してください</div> : 
  
  favoBoards.map(board => {

    const favoStyle = {
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
          props.currentBoard(board);
          props.setFavoOpen(false);
      }}>
        <Divider light/>
        <span style={favoStyle}></span>
        <ListItemText primary={board.title}></ListItemText>
        <span><i className="bi bi-star-fill"></i></span>
        <span style={{fontSize: '.7rem'}}>{`更新日: ${board.time.toLocaleString()}`}</span>
      </ListItem>
    )})
  ))

  return (
    <div> 
      <Dialog
        open={props.favoOpen}
        onClose={props.favoriteListClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          お気に入りボードリスト
        </DialogTitle>
        <List sx={style} component="nav" aria-label="mailbox folders">
          {items}
        </List>

        <DialogActions>
          <Button onClick={props.favoriteListClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FavoriteList;