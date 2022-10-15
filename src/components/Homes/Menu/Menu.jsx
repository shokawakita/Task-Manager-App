import React, {useCallback} from "react";
import {CreateBoardField, BoardSelect} from './index'

const Menu = (props) => {

  // ボード作成欄OPEN
  const createBoardFieldOpen = useCallback(() => {
    props.setCreateBoardOpen(true);
  }, [props.setCreateBoardOpen])

  // ボード作成欄CLOSE
  const createBoardClose = useCallback(() => {
    props.setCreateBoardOpen(false);
    props.setValue("");
    props.setSelectOpacity(1)
    props.setSelectColor("")
  }, [props.setCreateBoardOpen, props.setValue, props.setSelectOpacity, props.setColor])

  const user = {
    id: 1,
    birth: 19970630, 
    gender: 0, 
    age: 25, 
    name: {first: "翔", last: "川北"}, 
  }

  return (
    <div className={(props.isMenu ? "hidden home-menu" : "home-menu")}>
      <div>
        <h2>{user.name.first}さんのワークスペース</h2>
        <span 
          onClick={props.toggleMenu}
          className={props.isMenu ? "toggle" : ""}
          >
          <i className="bi bi-chevron-left"></i>
        </span>
      </div>

      <nav>
        <div className="home-menu-title">
          <p>ボード</p>
          <span onClick={createBoardFieldOpen}>
            <i className="bi bi-plus"></i>
          </span>
        </div>
        
        <CreateBoardField 
          createBoardOpen={props.createBoardOpen}
          color={props.color}
          value={props.value}
          boards={props.boards}
          createBoard={props.createBoard}
          createBoardClose={createBoardClose}
          opacityAdjust={props.opacityAdjust}
          selectColor={props.selectColor}
          selectOpacity={props.selectOpacity}
          updateColor={props.updateColor}
          updateText={props.updateText}
        />

        <BoardSelect
          boards={props.boards}
          setBoards={props.setBoards}
          currentBoard={props.currentBoard}
          deleteBoard={props.deleteBoard}
          onDragEnd={props.onDragEnd}
          toggleFavorite={props.toggleFavorite}
          updateBoard={props.updateBoard}
          updateText={props.updateText}
          composing={props.composing}
          startComposition={props.startComposition}
          endComposition={props.endComposition}
        />
      </nav>
    </div>
  );
}

export default Menu;