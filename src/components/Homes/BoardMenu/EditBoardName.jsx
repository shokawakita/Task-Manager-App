import React from "react";

const EditBoardName = (props) => {
  
  const inputStyle = {
    width: '100%',
    height: '64px',
    lineHeight: '64px', 
    textAlign: 'center', 
    borderBottom: '2px solid gray',
    display: (props.edit ? 'block' : 'none'),
  }

  return (
    <input 
      id="board-menu-name-edit"
      type="text" 
      autoFocus
      style={inputStyle}
      label="ボード名"
      placeholder="こちらのフォームからボード名を編集できます"
      value={props.value}
      onChange={(e)=> props.updateText(e)}
      onBlur={(e) => {
        props.updateBoard(e, props.board)
        props.setEdit(false);
      }}
      onCompositionStart={props.startComposition}
      onCompositionEnd={props.endComposition}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if(props.composing){
            return;
          } else {
            props.updateBoard(e, props.board)
            props.setEdit(false);
          }
        }}}
    />
  )
}

export default EditBoardName;