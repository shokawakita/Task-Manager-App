import React from "react";
import MenuItem from '@mui/material/MenuItem';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const checkStyle = {
  display: 'flex', 
  width: '48px',
  alignItems: 'center',
  padding: '0 4px',
  fontSize: '8px',
}

const iconStyle = {
  paddingTop: '4px', 
  fontSize: '12px',
}

const activeItemsStyle = {
  borderBottom: '1px solid gray',
  fontSize: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const style1 = {display: 'flex', alignItems: 'center'}

const style2 = {
  width: '180px',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',     
}

const titleStyle = {
  fontSize: '.8rem', 
  textAlign: 'center', 
  padding: '12px'
}

const ActiveItems = (props) => {

  const setDateTime = new Date();
  setDateTime.setDate(setDateTime.getDate() - 7)

  let filterItems = [{
      id: props.board.id, title: props.board, time: props.board, 
      lists: props.board.lists.map(list => {
    return {items: list.items.filter(item => {
      const activeTime = Date.parse(setDateTime.toLocaleString())
      const itemTime = Date.parse(item.time.toLocaleString())
      return (itemTime - activeTime > 0 )
      })}
    })
  }]

  filterItems.map(board => {
    return board.lists.map(list => {
      list.items.sort(function(a, b){
        if(Date.parse(a.time.toLocaleString()) > Date.parse(b.time.toLocaleString())){return 1}
        else if(Date.parse(a.time.toLocaleString()) < Date.parse(b.time.toLocaleString())){return -1}
        else {return 0}
      })
    })
  })

  const activeItems = filterItems.map(board => {
    return board.lists.map(list => {
      list.items.reverse();
      return list.items.map(item => {
        
        const labelStyle = {
          backgroundColor: `${item.label}`,
          width: '16px',
          height: '16px',  
          borderRadius: '4px',
          marginRight: '8px',
        }
  
        const checkedLists = item.checkLists.filter(check => {return check.isCheck})
        
        return (
          <MenuItem key={item.id} sx={activeItemsStyle}>
            <div style={style1}>
  
              <div style={(!item.label ? {} : labelStyle)}></div>
              <span style={style2}>{item.name}</span>
            </div>
            
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
                style={ item.comment !== "" ? checkStyle : {display: 'none'}}
                >
                <span><ChatBubbleOutlineIcon sx={iconStyle}/></span>
              </div>
            </div>
  
            <span style={{fontSize: '.8rem'}}>更新日時: {item.time.toLocaleString()}</span>
  
          </MenuItem>
        )
      })
    })
  })

  const formStyle = {
    display: (props.active ? 'block': 'none'),
    padding: '24px 0',
    maxHeight: '200px',
    overflowY: 'scroll',
  }

  return (
    <div id="active-item-form" style={formStyle}>
      <h2 style={titleStyle}>1週間以内に編集したアイテムリスト</h2>
      <ul>{activeItems}</ul>
    </div>
  )
}

export default ActiveItems;