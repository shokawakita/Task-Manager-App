import React, {useState, useEffect} from "react";
// import { useTime } from 'react-timer-hook';
import {ThemeColor, ActiveItems, EditBoardName, BoardMenuOptions, InformationList} from './index';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: 0,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const titleStyle = {
  height: '64px',
  lineHeight: '64px', 
  textAlign: 'center', 
  borderBottom: '2px solid gray'
}

const BoardMenu = (props) => {

  // テーマカラー変更のためのスイッチ
  const [themeColor, setThemeColor] = useState(false)

  //  ボード名編集のためのスイッチ
  const [edit, setEdit] = useState(false);

  // アクティビティアイテムの表示のためのスイッチ
  const [active, setActive] = useState(false);

  // ボードメニューの非表示スイッチ
  const boardMenuClose = () => {
    setActive(false);
    setThemeColor(false)
    setEdit(false)
    props.setSelectOpacity(1)
    props.setSelectColor("")
    props.setDisplay(false)
  }
  
  return (
    <BootstrapDialog
      key={props.board.id}
      onClose={() => {
        boardMenuClose();
        setEdit(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.display}
      >
      
      <div>
        <h2 style={titleStyle}>ボード名: {props.board.title}</h2>

        <EditBoardName
          board={props.board}
          edit={edit}
          value={props.value}
          setEdit={setEdit}
          updateText={props.updateText}
          updateBoard={props.updateBoard}
          startComposition={props.startComposition}
          endComposition={props.endComposition}
          composing={props.composing}
        />

        <InformationList board={props.board}/>

        <ThemeColor 
          board={props.board}
          boards={props.boards}
          themeColor={themeColor}
          color={props.color}
          selectColor={props.selectColor}
          selectOpacity={props.selectOpacity}
          setThemeColor={setThemeColor}
          editBoardColor={props.editBoardColor}
          opacityAdjust={props.opacityAdjust}
          updateColor={props.updateColor}
        />
      </div>
      <DialogContent dividers
        sx={{width: '600px'}}
      >
      <BoardMenuOptions 
        active={active}
        board={props.board}
        edit={edit}
        themeColor={themeColor}
        setActive={setActive}
        setDisplay={props.setDisplay}
        setEdit={setEdit}
        setThemeColor={setThemeColor}
        deleteBoard={props.deleteBoard}
        toggleFavorite={props.toggleFavorite}
      />
    </DialogContent>

      <ActiveItems 
        board={props.board}
        active={active}
      />

      <DialogActions>
        <Button onClick={() => {
          boardMenuClose();
          setEdit(false);
        }}>
        閉じる  
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default BoardMenu;



