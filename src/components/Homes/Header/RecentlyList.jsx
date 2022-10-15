import React from "react";
import {ActiveBoards, ActiveItemLists} from "./index";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

const RecentlyList = (props) => {
  
  return (
    <Dialog
      open={props.recent}
      onClose={props.recentlyListClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <ActiveBoards 
        boards={props.boards}
        recentlyListClose={props.recentlyListClose}
        currentBoard={props.currentBoard}
        setBoards={props.setBoards}
      />

      <ActiveItemLists 
        boards={props.boards}
        recentlyListClose={props.recentlyListClose}
        currentBoard={props.currentBoard}
        currentList={props.currentList}
        currentItem={props.currentItem}  
      />

      <DialogActions>
        <Button onClick={props.recentlyListClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecentlyList;

