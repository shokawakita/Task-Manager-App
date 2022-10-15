import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateBoardForm, SelectColors, OpacitySlider } from "./index";

// div style
const createStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '32px'
}

const CreateBoardField = (props) => {   

  return (
    <div>
      <Dialog
        open={props.createBoardOpen}
        onClose={props.createBoardClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          ボードの作成
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '32px'}}>
            こちらからボードを作成することができます。ボード名を記入し、背景色を選択してください。透明度を設定することもできます。
          </DialogContentText>

          {/* ボードの作成の為のフォーム */}
          <CreateBoardForm 
            value={props.value}
            createBoard={props.createBoard}
            updateText={props.updateText}
          />
        
        <div 
          className="setting-create-board"
          style={createStyle}
        >
          <SelectColors 
            color={props.color}
            selectColor={props.selectColor}
            selectOpacity={props.selectOpacity}
            updateColor={props.updateColor}
          />

          {/* カラーの詳細設定フォーム */}
          <OpacitySlider 
            opacityAdjust={props.opacityAdjust}
          />
        </div>
        {/* カラー選択用フォーム */}

        </DialogContent>
        <DialogActions>
          <Button onClick={props.createBoardClose}>キャンセル</Button>
          <Button 
            onChange={() => props.updateColor(e)}
            onClick={(e) => props.createBoard(e)} 
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBoardField;