import React  from "react";
import { SelectColors, OpacitySlider } from "../Menu/index";
import Button from '@mui/material/Button';

const style1 = {
  paddingTop: '16px',
  borderTop: '2px solid gray',
  borderBottom: '2px solid gray',
  textAlign: 'center'
} 

const style2 = {
  border: '2px solid orangeRed', 
  margin: '0px 16px',
  borderRadius: '8px'
}

const style3 = {
  fontSize: '.8rem',
  marginTop: '12px', 
}

const style4 = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 32px 24px 32px',
  alignItems: 'center'
}

const style5 = {
  margin: '16px auto',
  padding: '4px 48px'
}

const ThemeColor = (props) => {

  if(!props.themeColor){return}
  return (
    <div id="theme-color-form" style={style1}>

      <div style={style2}>

        <p style={style3}>ボードカラーの編集</p>

        <div style={style4}>

          <SelectColors 
            color={props.color}
            selectColor={props.selectColor}
            selectOpacity={props.selectOpacity}
            updateColor={props.updateColor}
          />
          <OpacitySlider 
            opacityAdjust={props.opacityAdjust}/>
        </div>
      </div>
      <Button sx={style5}variant="contained" onClick={() => {
        props.editBoardColor(props.board)
        props.setThemeColor(false)
      }}>確定</Button>
    </div>
  )
}

export default ThemeColor;