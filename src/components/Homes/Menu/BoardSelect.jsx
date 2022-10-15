import React, {useState}  from "react";
import {Draggable, DragDropContext, Droppable} from 'react-beautiful-dnd';
import {date} from '../../../functions/index';

const BoardSelect = (props) => {  

  // ボード名を編集するためのトリガー関数
  const editForm = (e, currentBoard) => {
    e.stopPropagation();  
    const newBoards = props.boards.map(board => {
      return {id: board.id, title: board.title,
      opacity: board.opacity, color: board.color, isFavorite: board.isFavorite, lists: board.lists, 
      current: (board === currentBoard ? true : false),  
      time: (board.current ? date() : board.time),
      edit : (board === currentBoard ? !board.edit : false)
    }})
    props.setBoards(newBoards)
  }

  // ボードがない時で場合分け
  const items = (
    !props.boards ? <li>ボードを追加してください</li> : props.boards.map((board, index) => {

    // span style
    const spanStyle = {backgroundColor: `rgba(${board.color.color1}, ${board.color.color2}, ${board.color.color3}, ${board.opacity})`}

    return (
      <Draggable
        key={board.id}
        draggableId={"q-" + board.id}
        index={index}
      >
        {provided => (
        <li 
          className={board.current ? "appear" : ""}
          onClick={() => props.currentBoard(board)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
            
          <div>
            <div>
              <span style={spanStyle}></span>
              <p 
                className={board.edit ? "hidden" : ""}
                onClick={(e) => editForm(e, board)}
              >
                {board.title}</p>

              <input 
                type="text" 
                className={board.edit ? "appear" : ""}
                defaultValue={board.title} 
                onChange={(e) => props.updateText(e)}
                onBlur={(e) => {props.updateBoard(e, board);}}
                placeholder="ボード名を入力"
                onCompositionStart={props.startComposition}
                onCompositionEnd={props.endComposition}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if(props.composing){
                    return;
                  } else {props.updateBoard(e, board);}
                }}}  
              />
              
            </div>
            <div>
              <span onClick={(e) => props.deleteBoard(e, board)}>
                <i className="bi bi-x-lg"></i>
              </span>
              <span onClick={() => props.toggleFavorite(board)}>
                <i  className={board.isFavorite ? "bi bi-star-fill" : "bi bi-star"}></i>
              </span>
            </div>
          </div>
        </li>
      )}
    </Draggable>
    )
  })
  )

  return (
     // ドラッグアンドドロップの有効範囲
     <DragDropContext onDragEnd={props.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <ul
              className="home-menu-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
  )
}

export default BoardSelect;