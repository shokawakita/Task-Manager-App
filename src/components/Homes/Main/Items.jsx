import React, {useState, useCallback} from "react";
import {ItemMenu} from "../ItemMenu/index"
import {Draggable} from 'react-beautiful-dnd';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {date} from '../../../functions/index';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const iconStyle = {
  paddingTop: '8px', 
  fontSize: '12px',
}

const commentStyle = {
  padding: '0 4px',
  fontSize: '8px',
}
const Items = (props) => {
  const [itemMenuOpen , setItemMenuOpen] = useState(false)

  const itemMenuFieldOpen = useCallback(() => {
    setItemMenuOpen(true);
  }, [itemMenuOpen]);
  const itemMenuClose = useCallback(() => {
    setItemMenuOpen(false);
  }, [setItemMenuOpen]);

  const editItem = (e, currentItem) => {
    e.stopPropagation();
    const newBoards = props.boards.map(board => {
      return {id: board.id, title: board.title,
        opacity: board.opacity, color: board.color, isFavorite: board.isFavorite, current: board.current, edit: board.edit,
        time: (board.current ? date() : board.time),
        lists: board.lists.map(list => {
          return {id: list.id, name: list.name, current: list.current, 
          items: list.items.map(item => {
            return {id: item.id, name: item.name, label: item.label,  comment: item.comment,  checkLists: item.checkLists, 
            current: (item === currentItem ? true : false),
            time: (item.current ? date() : item.time),
            edit: (item === currentItem ? !item.edit : false)
            }
          })
          }
        })
      }})
    props.setBoards(newBoards)
  }

  const currentBoard = props.boards.filter(board => {
    return board.current
  })

  const items = props.list.items.map((item, index) => {
    const checkedLists = item.checkLists.filter(check => {return check.isCheck})
    if(!item){return}

    const divStyle = {
      height: '31.5px',
      backgroundColor: `${item.label}`,
      borderRadius: '4px',
    }

    const checkStyle = {
      display: 'flex', 
      width: '48px',
      alignItems: 'center',
      fontSize: '8px',
    }

    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
      {provided => (

      <div 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {(item.label !== "unset"? 
          <div style={divStyle}></div>
         : "")}
        <li 
          className="item"
          style={{border: (item.current ? "1px solid red" : "unset")}}
          onClick={(e) => {
            e.stopPropagation();
            props.currentItem(currentBoard[0], props.list, item)
          }}
        >
          <p 
            className={item.edit ? "hidden" : ""}
            onClick={(e) => editItem(e, item)}>
            {item.name}</p>

          <input 
            type="text" 
            className={item.edit ? "appear" : ""}
            defaultValue={item.name}
            onChange={(e) => props.updateText(e)}
            onBlur={(e) => props.updateItem(e, item)}
            onCompositionStart={props.startComposition}
            onCompositionEnd={props.endComposition}
            placeholder="アイテム名を入力してください"
            onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(props.composing){
                return;
              } else {props.updateItem(e, item)}
            }}}
          />

          <div style={{display: 'flex'}}>
            <div 
              style={ item.checkLists.length ? checkStyle : {display: 'none'}}  
            >
              <span><CheckBoxIcon sx={iconStyle}/></span>
              <span style={{fontSize: '8px'}}>
                {`${checkedLists.length} / ${item.checkLists.length}`}
              </span>
            </div>

            <div
              style={ item.comment !== "" ? commentStyle : {display: 'none'}}
            >
              <span><ChatBubbleOutlineIcon sx={iconStyle}/></span>
            </div>
          </div>

          <span 
            onClick={(e) => props.deleteItem(e, currentBoard[0], props.list, item)}
          ><i className="bi bi-x-lg"></i></span>
          <span onClick={(e) => {
            e.stopPropagation();
            props.currentItem(currentBoard[0], props.list, item)
            itemMenuFieldOpen();
            
          }}><i className="bi bi-three-dots"></i></span>

          <ItemMenu 
            item={item}
            itemMenuOpen={itemMenuOpen}
            boards={props.boards}
            value={props.value}
            setBoards={props.setBoards}
            setSelectColor={props.setSelectColor}
            setValue={props.setValue}
            itemMenuClose={itemMenuClose}
            updateColor={props.updateColor}
            updateItem={props.updateItem}    
            updateText={props.updateText}
            composing={props.composing}    
            startComposition={props.startComposition}
            endComposition={props.endComposition}
          />
        </li>
      </div>
      )}
      </Draggable>
    )
  })
  return (<>{items}</>)
}

export default Items;
  
