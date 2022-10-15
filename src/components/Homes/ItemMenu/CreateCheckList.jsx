import React from 'react';
import {Progress} from './index';
import Checkbox from '@mui/material/Checkbox';
import { useCallback } from 'react';
import {getUniqueId, date} from "../../../functions/index"

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CreateCheckList = (props) => {

  // チェックリストの作成のための関数
  const createCheckList = useCallback((e) => {
    e.stopPropagation();
    const newBoards = props.boards.map(board => {
      return {
        id: board.id, title: board.title, current: board.current, opacity: board.opacity, edit: board.edit, color: board.color,isFavorite: board.isFavorite, time: (board.current ? date() : board.time), lists: board.lists.map(list => {
          return {
            id: list.id, name: list.name, current: list.current, items: list.items.map(item =>{
              return {
                id: item.id, name: item.name, label: item.label, current: item.current, comment: item.comment, edit: item.edit, 
                time: (item.current ? date() : item.time),
                checkLists: (item.current ? (item.checkLists ? [...item.checkLists, {id: getUniqueId(), title: e.target.value, isCheck: false,}] : [{id: getUniqueId(), title: e.target.value, isCheck: false,}]) : item.checkLists)
              }
            })
          }
        })
      }
    })

    if(e.target.value.trim() === ""){
      props.setValue("")
      return alert("リスト名を入力してください")
    } else {
      props.setValue("");
      props.setBoards(newBoards);
    }
  }, [props.boards])

  // チェックリストのチェック切り替えのための関数
  const updateToggleCheck = (e, currentCheck) => {
    e.stopPropagation();
    e.preventDefault()

    const newBoards = props.boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color,
        isFavorite: board.isFavorite,
        current: board.current,
        time: (board.current ? date() : board.time),
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: list.current,
            items: list.items.map(item => {
              return {
                id: item.id,
                name: item.name,
                current: item.current,
                label: item.label,
                comment: item.comment, 
                edit: item.edit,
                time: (item.current ? date() : item.time),
                checkLists: (!item.current ? item.checkLists : item.checkLists.map(check => {
                  return {
                    id: check.id,
                    title: check.title,
                    isCheck: 
                    (check === currentCheck ? !check.isCheck : check.isCheck),
                  } 
                })),
              }
            })
        }}),
      }
    })
    props.setBoards(newBoards)
  }

  // チェックリストの削除
  const deleteCheckList = useCallback((e, currentCheckList) => {
    e.stopPropagation();
    e.preventDefault();

    if(!confirm("こちらのチェックリストを削除してもよろしいでしょうか？")){return;}

    const newCheckList = props.item.checkLists.filter(check => {return check !== currentCheckList})

    const newBoards = props.boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color,
        isFavorite: board.isFavorite,
        time: (board.current ? date() : board.time),
        current: board.current,
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: list.items.map(item => {
              return {
                id: item.id,
                name: item.name,
                label: item.label,
                time: (item.current ? date() : item.time),
                comment: item.comment,
                edit: item.edit,
                current: item.current,
                checkLists: (item === props.item ? newCheckList : item.checkLists)
              }
            })
          }
        })
      }
    })
    props.setBoards(newBoards)
  }, [props.boards])


  // チェックリストのタイトル名編集のための関数
  const updateCheck = (e, currentCheckList) => {
    // e.stopPropagation(); 
    const newBoards = props.boards.map(board => {
      return {
        id: board.id, title: board.title, current: board.current, opacity: board.opacity, edit: board.edit, color: board.color,isFavorite: board.isFavorite, time: (board.current ? date() : board.time), lists: board.lists.map(list => {
          return {
            id: list.id, name: list.name, current: list.current, items: list.items.map(item =>{
              return {
                id: item.id, name: item.name, label: item.label, current: item.current, comment: item.comment, edit: item.edit, time: (item.current ? date() : item.time),
                checkLists: (!item.checkLists ? [] : item.checkLists.map(check => {
                  return {
                    id: check.id,
                    title: (check.title === currentCheckList ? e.target.value : check.title),
                    isCheck: check.isCheck,
                  }
                })),
              }
            })
          }
        })
      }
    })

    if(e.target.value.trim() === ''){
      props.setValue("")
      e.target.value = currentCheckList.title;
      return alert("リスト名を入力してください")
    } else {
      props.setBoards(newBoards);
      props.setValue("")
    }
  }

    // 作成したチェックリストの定義
    const checkList = (!props.item.checkLists ? (<li>リストを追加してください</li>) : 
      props.item.checkLists.map(check => {
        return (
          <li 
            key={check.id}
            className="check-list"
          >
            <Checkbox
              {...label}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              onClick={(e) => updateToggleCheck(e, check)}
              checked={check.isCheck}
            />
            <textarea 
              rows="2"
              defaultValue={check.title}
              onChange={(e) => props.updateText(e)}
              onBlur={(e) => updateCheck(e, check)}
              onCompositionStart={props.startComposition}
              onCompositionEnd={props.endComposition}
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                if(props.composing){
                  return;
                } else {updateCheck(e, check)}
              }}}
            ></textarea>

            <span onClick={(e) => deleteCheckList(e, check)}
            ><i className="bi bi-x-lg"></i></span>
          </li>
        )
      })
    )

    const pStyle = {
      userSelect: 'none', 
      marginLeft: '16px'
    }
    
    // 呼び出し
    return (
      <article className="check-list">

        <div 
          onClick={props.handleOpen}
          className={props.checkListOpen ? "check-form hidden" : "check-form"}
        >
          <p style={pStyle}>チェックリストを追加する</p>
          <span><i className="bi bi-plus"></i></span>
        </div>
        
        <div className={props.checkListOpen ? "appear create-check" : "create-check"}>
          <input 
            type="text"
            value={props.value}
            onChange={(e) => {
              e.stopPropagation();
              props.updateText(e);
            }}
            placeholder="チェックリストを追加"
            onCompositionStart={props.startComposition}
            onCompositionEnd={props.endComposition}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if(props.composing){
                  return;
                } else {createCheckList(e)}
              }}}
          />
          <span onClick={props.handleClose}>
            <i className="bi bi-x-lg"></i>
          </span>

          <Progress item={props.item}/>

          <ul>{checkList}</ul>
        </div>
      </article>
    )
  // }
}

export default CreateCheckList;

// コメントのバリューの値を別のStateで保持するORチェックリストのスタイルを整える








