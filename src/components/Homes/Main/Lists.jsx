import React, {useState, useCallback} from "react";
import {Items, CreateItemField} from './index';
import {Droppable} from 'react-beautiful-dnd';

const Lists = (props) => {
  
  //  アイテム作成欄の表示切り替え
  const [createItemOpen, setCreateItemOpen] = useState(false);
  
  // アイテム作成欄の表示切り替え
  const createItemFieldOpen = useCallback(() => {
    setCreateItemOpen(true)
  }, [createItemOpen])

  const createItemFieldClose = useCallback(() => {
    setCreateItemOpen(false)
  }, [createItemOpen])

  // リスト名の編集
  const updateList = (e, currentBoard, currentList) => {

    if(e.target.value.trim() === ''){
      e.target.value = currentList.name;
      props.setValue("")
      return alert("リスト名を入力してください");
    }

    // まる重複した名前があたら弾く
    const listName = currentBoard.lists.map(list => {
      return (list.name)
    })
    const pos = listName.map(list => {
      return list
    }).indexOf(currentList.name)

    listName.push(props.value)

    let s = new Set(listName);

    if(s.size != listName.length && currentList.name !== e.target.value){
      props.setValue("")
      e.target.value = currentList.name;
      return alert("リスト名が重複しています。別の名前を入力してください。")
    }

    // ○ リスト名変更後の保存
    const newBoards = props.boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        time: board.time,
        color: board.color, 
        isFavorite: board.isFavorite,
        current: board.current, 
        lists: board.lists.map(list => {
          return {
            id: list.id,
            current: list.current,
            items: list.items,
            name: (list.current ? e.target.value : list.name)
          }
        })
      }
    })    
    e.currentTarget.blur();
    props.setBoards(newBoards);
    props.setValue("")
  }

  const board = (!props.boards ? [] :
    props.boards.filter(board => {
      return (board.current)
    }))

  // ドラッグアンドドロップさせたい要素
  const lists = (board.length === 0 ? <></> : 
  board[0].lists.map(list => {
    return (
      <div  
      key={list.id}
      className={list.current ? "board-list current" : "board-list"}
      onClick={() => props.currentList(board[0], list)}
      >
        <div className="board-list-title">
          <input 
            type="text" 
            defaultValue={list.name} 
            onChange={(e) => props.updateText(e)}
            onBlur={(e) => updateList(e, board[0], list)}
            onCompositionStart={props.startComposition}
            onCompositionEnd={props.endComposition}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if(props.composing){
                  return;
                } else {updateList(e, board[0], list)}
              }}}
              />
          <span onClick={(e) => props.deleteList(e, board[0], list)}>
            <i className="bi bi-x-lg"></i></span>
        </div>

        <Droppable droppableId={list.id}>
          {provided => (
            <ul className="board-list-items"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Items 
                value={props.value}
                boards={props.boards} 
                list={list}
                setValue={props.setValue}
                setSelectColor={props.setSelectColor}
                setBoards={props.setBoards}  
                currentItem={props.currentItem}
                deleteItem={props.deleteItem}
                updateColor={props.updateColor}
                updateItem={props.updateItem}
                updateText={props.updateText}
                composing={props.composing}
                startComposition={props.startComposition}
                endComposition={props.endComposition}
              />

              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <div className="board-list-add-item">
          <div 
            className={createItemOpen && list.current ? "add-item hidden" : "add-item"}
            onClick={createItemFieldOpen}
            >
            <span><i className="bi bi-plus"></i></span>
            <p>アイテムを追加</p>
          </div>

          <div className={createItemOpen && list.current ? "create-item appear" : "create-item"}>
            <CreateItemField
              value={props.value}
              createItem={props.createItem}
              createItemFieldClose={createItemFieldClose}
              updateText={props.updateText}
              composing={props.composing}
              startComposition={props.startComposition}
              endComposition={props.endComposition}
              />
          </div>
        </div>
      </div>
    )
  })
  )
  return (<div className="board-main-list">{lists}</div>)
}

export default Lists;