import React ,{useState} from "react";
import { BoardMenu } from "../BoardMenu/index";

const BoardHeader = (props) => {

  // ボードメニューの表示切り替えのための定義
  const [display, setDisplay] = useState(false) 

  const boardMenuOpen = () => {
    setDisplay(true)
  }
  
  // ボードがない時の表示
  if(props.boards.length === 0){return (
    <header><nav><ul>
      <li><p>翔さんのワークスペース</p></li>
      <li>
        <span><i className='bi bi-person-circle'></i></span>
      </li>
    </ul></nav></header>
  )} 

  {/* ボードメニューの表示 */}
  const boardMenu = props.boards.map(board => {

  if(!board.current){return}
  return (
    <header key={board.id}>
      <nav>
        <ul>
          <li>
            <p>翔さんのワークスペース</p>
          </li>
          
          <li onClick={() => props.toggleFavorite(board)}>
            <span>
              <i  className={(board.isFavorite ? "bi bi-star-fill" : "bi bi-star")}></i>
            </span>
          </li>

          <li onClick={boardMenuOpen}>
            <p>ボードメニューを表示</p>
          </li>
          
        </ul>

        <BoardMenu
          display={display}
          boards={props.boards}
          board={board}
          color={props.color}
          value={props.value}
          selectOpacity={props.selectOpacity}
          selectColor={props.selectColor}
          setDisplay={setDisplay}
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
      </nav>
    </header>
    )
  })

  return (<>{boardMenu}</>)
}

export default BoardHeader;