import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import escapeStringRegexp from "escape-string-regexp";

const listStyle1 = {
  width: '100%',
  maxWidth: '560px',
  bgcolor: 'background.paper',
};

const h2Style = {
  color: 'black',
  textAlign: 'center',
  fontSize: '.8rem',
  padding: '16px 0',
  textDecoration: 'underLine',
  fontWeight: 'bold',
}

const listItemStyle = {
  fontSize: '.6rem',
  lineHeight: '28px',
  padding: '12px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  color: 'black',
}

const searchTextStyle = {
  fontSize: '.9rem',
  display: 'inline-block',
  width: '140px',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const locateTextStyle = {
  width: '200px',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const SearchResult = (props) => {

  const articleStyle = {
    display: (props.find ? 'block' : 'none'),
    position: 'absolute',
    top: '56px',
    right: '160px',
    width: '410px',
    borderRadius: '8px',
    height: '600px',
    backgroundColor: 'white',
    overflowY: 'scroll',
  }

  // ボード名の検索結果リスト
  const keyBoards = props.boards.filter((board) => {
    const escapedText = escapeStringRegexp(props.keyword.toLowerCase());
    return new RegExp(escapedText).test(board.title.toLowerCase());
  })

  // リスト名の検索結果リスト
  const keyLists = props.boards.map(board => {
    return {     
      id: board.id, title: board.title,
      lists: board.lists.filter(list => {
      const escapedText = escapeStringRegexp(props.keyword.toLowerCase());
      return new RegExp(escapedText).test(list.name.toLowerCase());
    })
    }
  })

  //  アイテム名の検索結果リスト
  const keyItems = props.boards.map(board => {
    return {
      id: board.id, title: board.title,
      lists: board.lists.map(list => { 
        return {
          id: list.id, name: list.name,
          items: list.items.filter(item => {
          const escapedText = escapeStringRegexp(props.keyword.toLowerCase());
          return new RegExp(escapedText).test(item.name.toLowerCase());
        })
        }
      })
    } 
  })

  // チェックリスト名の検索結果リスト
  const keyCheckLists = props.boards.map(board => {
    return {
      id: board.id, title: board.title,
      lists: board.lists.map(list => { 
        return {
          id: list.id, name: list.name,
          items: list.items.map(item => {
            return {
              id: item.id, name: item.name,
              checkLists: item.checkLists.filter(check => {
              const escapedText = escapeStringRegexp(props.keyword.toLowerCase());
              return new RegExp(escapedText).test(check.title.toLowerCase());
              })
            }
          })
        }
      })
    } 
  })

  // ボードの検索結果をリスト化
  const boards = keyBoards.map(board => {

    const colorStyle = {
      backgroundColor: `rgba(${board.color.color1},${board.color.color2}, ${board.color.color3}, ${board.opacity})`,
      padding: '3px 8px',
    }

    return (
      <ListItem button divider
        onClick={() => {
          props.currentBoard(board)
          props.setFind(false)
        }}
        key={board.id}
        sx={listItemStyle}
      >
        <Divider light/>
        <p style={searchTextStyle}>{board.title}</p>
        <div style={locateTextStyle}>
          <span style={colorStyle}></span>
          <span><i className="bi bi-star-fill"></i></span>
          <span>更新日: </span>
          <span>{board.time.toLocaleString()}</span>
        </div>
      </ListItem>
    )})

  // リストの検索結果をリスト化
  const lists = keyLists.map(board => {
    return board.lists.map(list => {
      return (
        <ListItem button divider
          onClick={() => {
            props.currentBoard(board);
            props.currentList(board, list);
            props.setFind(false)
          }}
          key={list.id}
          sx={listItemStyle}
        >
          <Divider light/>
          <p style={searchTextStyle}>{list.name}</p>
          <div style={locateTextStyle}>
            <span>場所</span>
            <span style={{}}>{`ボード:${board.title}`}</span>
          </div>
        </ListItem>
      )
    })
  })
  
  // アイテムの検索結果をリスト化
  const items = keyItems.map(board => {
    return board.lists.map(list => {
      return list.items.map(item => {
        return (
          <ListItem button divider
            onClick={() => {
              props.currentBoard(board);
              props.currentList(board, list)
              props.currentItem(board, list, item)
              props.setFind(false)
              props.setKeyword("")
            }}
            key={item.id}
            sx={listItemStyle}
          >
            <Divider light/>
            <p style={searchTextStyle}>{item.name}</p>
            <div style={locateTextStyle}>
              <span>場所　</span>
              <span style={{}}>{`ボード名: "${board.title}" `}</span>
              <span style={{}}>{`リスト名: "${list.name}"`}</span>
            </div>
          </ListItem>
        )
      })
    })
  })

  // チェックリストの検索結果をリスト化
  const checkLists = keyCheckLists.map(board => {
    return board.lists.map(list => {
      return list.items.map(item => {
        return item.checkLists.map(check => {
          return (
            <ListItem button divider
              onClick={() => {
                props.currentBoard(board);
                props.currentList(board, list)
                props.currentItem(board, list, item)
                props.setFind(false)
                props.setKeyword("")
              }}
              key={check.id}
              sx={listItemStyle}
            >
              <Divider light/>
              <p style={searchTextStyle}>{check.title}</p>
              <div style={locateTextStyle}>
                <span>場所　</span>
                <span style={{}}>{`アイテム名: "${item.name}"`}</span>
              </div>
            </ListItem>
          )
        })
      })
    })
  })
  

  const listData = [
    {title: "ボード名", lists: boards,},
    {title: "リスト名", lists: lists,},
    {title: "アイテム名", lists: items,},
    {title: "チェックリスト名", lists: checkLists,},
  ]

  const result = listData.map((list, index) => {
    return (
      <div key={index} style={{width: '100%'}}>
        <h2 style={h2Style}>{list.title}</h2>
        <List 
          sx={listStyle1} 
          component="nav" 
          aria-label="mailbox folders"
        >{list.lists}</List>
      </div>
    )
  })

  return (
    <div style={{position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, pointerEvents: (props.find ? 'auto' : 'none')}}
    onClick={(e) => props.closeSlideOut(e, props.setFind)}
    
    >
      <article 
        id="search" 
        style={articleStyle} 
      >
        {result}</article>
    </div>
  )
}

export default SearchResult;