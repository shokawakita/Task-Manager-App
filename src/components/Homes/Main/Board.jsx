import React from "react";
import {BoardHeader, BoardMain} from './index'

const Board = (props) => {
  
  return (
    <div className={props.isMenu ? "board wide" : "board"}>
      <BoardHeader 
        boards={props.boards}
        color={props.color}
        value={props.value}
        selectColor={props.selectColor}
        selectOpacity={props.selectOpacity}
        setSelectColor={props.setSelectColor}
        setSelectOpacity={props.setSelectOpacity}
        deleteBoard={props.deleteBoard}
        editBoardColor={props.editBoardColor}
        opacityAdjust={props.opacityAdjust}
        toggleFavorite={props.toggleFavorite}
        updateBoard={props.updateBoard}
        updateColor={props.updateColor}
        updateText={props.updateText}
        composing={props.composing}
        startComposition={props.startComposition}
        endComposition={props.endComposition}
      />
      <BoardMain 
        boards={props.boards}
        createListOpen={props.createListOpen}
        value={props.value}
        setBoards={props.setBoards}
        setCreateListOpen={props.setCreateListOpen}
        setSelectColor={props.setSelectColor}
        setValue={props.setValue}
        createItem={props.createItem}
        createList={props.createList}
        currentItem={props.currentItem}
        currentList={props.currentList}
        deleteItem={props.deleteItem}
        deleteList={props.deleteList}
        onDragEndItems={props.onDragEndItems}
        updateColor={props.updateColor}
        updateItem={props.updateItem}
        updateText={props.updateText}
        composing={props.composing}
        startComposition={props.startComposition}
        endComposition={props.endComposition}
      />
    </div>
  );
}

export default Board;