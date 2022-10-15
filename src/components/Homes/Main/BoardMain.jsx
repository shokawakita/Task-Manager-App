import React, {useCallback} from "react";
import {CreateListField, Lists} from './index.js';
import {DragDropContext} from 'react-beautiful-dnd';

const BoardMain = (props) => {

   // ボードリストOPEN
   const createListToggle = useCallback(() => {
    props.setCreateListOpen(!props.createListOpen);
  }, [props.createListOpen])
  
  return (
    <div className="board-main">
      <DragDropContext onDragEnd={props.onDragEndItems}>
        <Lists 
          boards={props.boards}
          value={props.value}
          setBoards={props.setBoards}
          setSelectColor={props.setSelectColor}
          setValue={props.setValue}
          createItem={props.createItem}
          currentItem={props.currentItem}
          currentList={props.currentList}
          deleteItem={props.deleteItem}
          deleteList={props.deleteList}
          updateColor={props.updateColor}
          updateItem={props.updateItem}
          updateText={props.updateText}
          composing={props.composing}
          startComposition={props.startComposition}
          endComposition={props.endComposition}
        />
      </DragDropContext>
      <div 
        className="add-list"
        style={props.boards.length === 0 ? {display: 'none'}  : {}}
      >
        <div className={props.createListOpen ? "appear" : ""}>
          <div  onClick={createListToggle}>
            <span><i className="bi bi-plus"></i></span>
            <p> もう一つリストを追加する</p>
          </div>
          <div>
            <CreateListField 
              boards={props.boards}
              createListOpen={props.createListOpen}
              value={props.value}
              setBoards={props.setBoards}
              setCreateListOpen={props.setCreateListOpen}
              setValue={props.setValue}
              createList={props.createList}
              createListToggle={createListToggle}
              updateText={props.updateText}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardMain;