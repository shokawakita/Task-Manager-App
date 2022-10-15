import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const style = {
  width: '100%',
  maxWidth: '560px',
  bgcolor: 'background.paper',
  height: '400px',
  overflowY: 'scroll',
};

const iconStyle = {
  paddingTop: '8px', 
  fontSize: '12px',
}

const commentStyle = {
  padding: '0 4px',
  fontSize: '8px',
}

const ActiveItemLists = (props) => {

  const setDateTime = new Date();
  setDateTime.setDate(setDateTime.getDate() - 3)

  let filterItems = props.boards.map(board => {
    return {
      id: board.id, title: board.title, time: board.time, current: board.currente, opacity: board.opacity, color: board.color, edit: board.edit, isFavorite: board.isFavorite,
      lists: board.lists.map(list => {
        return {
          id: list.id, name: list.name, current: list.current, 
          items: list.items.filter(item => {
            const activeTime = Date.parse(setDateTime.toLocaleString())
            const itemTime = Date.parse(item.time.toLocaleString())
            return (itemTime - activeTime > 0 )
          })
        }
      })
    }
  })

  //  ボードごとに最新順に並べ替えをおこなう
  filterItems.sort(function(a, b){
    if(Date.parse(a.time.toLocaleString()) > Date.parse(b.time.toLocaleString())){return 1}
    else if(Date.parse(a.time.toLocaleString()) < Date.parse(b.time.toLocaleString())){return -1}
    else {return 0}
  })

  filterItems.map(board => {
    return board.lists.map(list => {
      list.items.sort(function(a, b){
        if(Date.parse(a.time.toLocaleString()) > Date.parse(b.time.toLocaleString())){return 1}
        else if(Date.parse(a.time.toLocaleString()) < Date.parse(b.time.toLocaleString())){return -1}
        else {return 0}
      })
    })
  })

  filterItems.reverse();

  const activeItemLists = filterItems.map(board => {
    return board.lists.map(list => {
      list.items.reverse();
      return list.items.map(item => {

        const listItemStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          backgroundColor: (item.label ? item.label : ""),
        }

        const checkedLists = item.checkLists.filter(check => {return check.isCheck})
        if(!item){return}
    
        const checkStyle = {
          display: 'flex', 
          width: '48px',
          alignItems: 'center',
          fontSize: '8px',
        }

        return (
          <ListItem button divider
          key={item.id}
          style={listItemStyle}
          onClick={() => {
            props.currentBoard(board)
            props.currentList(board, list)
            props.currentItem(board, list, item)
            props.recentlyListClose()
          }}
          >
            <Divider light/>
            <ListItemText 
              primary={item.name}
            ></ListItemText>
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
            <span style={{fontSize: '.7rem'}}>{`更新時間: ${item.time.toLocaleString()}`}</span>
          </ListItem>
        )
      })
    })
  })  

  return (
    <>
      <DialogTitle sx={{padding: '32px'}}>
      最近使用したアイテム(過去3日間)
    </DialogTitle>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {activeItemLists}
      </List>
    </>
  )
}

export default ActiveItemLists;