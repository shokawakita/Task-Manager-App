import React from "react";
import MenuItem from '@mui/material/MenuItem';

const BoardMenuOptions = (props) => {
  
  //  メニューオプションの場合分け
  const boardOption = (e, option) => {
    switch(true){
      case option === 0:
        props.setThemeColor(!props.themeColor);
        break;
      case option === 1:
        props.toggleFavorite(props.board);
        break;  
      case option === 2:
        props.setEdit(!props.edit);
        break;
      case option === 3:
        props.setActive(!props.active);
        break;
      case option === 4:
        props.deleteBoard(e, props.board);
        props.setDisplay(false)
        break;
    }
  }

  // メニューアイテムの定義
  const menuItems = [
    {title: "テーマカラーを変更する", color: ""},
    {title: "お気に入り登録する", color: ""},
    {title: "ボード名を編集する", color: ""},
    {title: "アクティビティのアイテムを表示する", color: ""},
    {title: "ボードを削除する", color: "red"},
  ]

  // ボードのメニューアイテムの取得
  const boardMenuItem = menuItems.map((item, index) => {
  
    const style = {
      fontSize: '.9rem',
      padding: '16px 32px',
      borderBottom: "1px solid #eee", 
      color: `${item.color}`,
    }

    return (
      <MenuItem 
        key={index}
        className={(props.edit || props.themeColor === true ? "board-menu-options move" : "board-menu-options")}  
        sx={style}
        onClick={(e) => boardOption(e, index)}  
      >{item.title}</MenuItem>
    )
  })

  return (
    <>{boardMenuItem}</>
  )
}

export default BoardMenuOptions;