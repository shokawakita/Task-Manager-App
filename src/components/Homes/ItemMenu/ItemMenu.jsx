import React, {useState} from "react";
import {CreateCheckList, ItemOption} from "./index";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const ItemMenu = (props) => {

   // チェックリスト作成欄の表示切り替えのための定義　
   const [checkListOpen, setCheckListOpen] = useState(false);

   const handleOpen = () => {
      setCheckListOpen(true);
   }
 
   const handleClose = () => {
      setCheckListOpen(false);
   }
  
   const inputStyle = {
    fontSize: "1.5rem",
    backgroundColor: `${props.item.label}`,
  }

  // Currentのアイテムメニューのみ表示するためのIf
  if(!props.item.current){
    return;
  } else {
    return (
      <div className="item-menu">
        <BootstrapDialog
          onClose={props.itemMenuClose}
          aria-labelledby="customized-dialog-title"
          open={props.itemMenuOpen}
        >

          <input 
            className="item-name-edit"
            type="text"  
            style={inputStyle}
            defaultValue={props.item.name}
            placeholder="アイテム名を入力"
            onClick={handleClose}
            onChange={(e) => props.updateText(e)}
            onBlur={(e) => props.updateItem(e, props.item)}
            onCompositionStart={props.startComposition}
            onCompositionEnd={props.endComposition}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if(props.composing){
                  return;
                } else {props.updateItem(e, props.item)}
              }}}
          />

          <ItemOption 
            boards={props.boards}
            item={props.item}
            setBoards={props.setBoards}
            setSelectColor={props.setSelectColor}
            handleClose={handleClose}
            setValue={props.setValue}
            updateText={props.updateText}
            updateColor={props.updateColor}
            startComposition={props.startComposition}
            endComposition={props.endComposition}
            composing={props.composing}
          />
            
          <DialogContent dividers>

            <CreateCheckList 
              checkListOpen={checkListOpen}
              boards={props.boards}
              item={props.item}
              value={props.value}
              setValue={props.setValue}
              setBoards={props.setBoards}
              handleClose={handleClose}
              handleOpen={handleOpen}
              updateText={props.updateText}
              startComposition={props.startComposition}
              endComposition={props.endComposition}
              composing={props.composing}
            />
  
          </DialogContent>
          <DialogActions>
            <Button onClick={props.itemMenuClose}>
              閉じる
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }
  // } 
}

export default ItemMenu;