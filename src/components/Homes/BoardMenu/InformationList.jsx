import React from "react";

const listStyle = {
  display: 'flex',
  gap: '32px',
  padding: '48px 32px',
  fontSize: '.8rem',
  alignItems: 'center',
  fontSize: '.8rem',
  color: 'gray',
}

const infoListStyle = {
  display: 'flex',
  alignItems: 'center'
}

const InformationList = (props) => {
  
  // color style
  const colorStyle = {
    backgroundColor: `rgba(${props.board.color.color1}, ${props.board.color.color2}, ${props.board.color.color3}, ${props.board.opacity})`,
    width: '16px',
    height: '16px',
    border: '1px solid black',
    borderRadius: '4px',
    marginLeft: '4px',
  }
  
  // アイテム数の合計の取得
  const array = (props.board.lists.map((list) => list.items.length))
  const items = array.reduce(function(a, b){return a + b})
  
  // ボードの更新時間の取得
  const boardTime = props.board.time.toLocaleString()
  
  // ボードの情報の定義
  const information = [
    {list: "テーマカラー", span: '', spanStyle: colorStyle},
    {list: "アイテム数: ", span: `${items}`, spanStyle: {marginLeft: '2px'}},
    {list: "お気に入り: ", span: <i className={!props.board.isFavorite ? "bi bi-star" : "bi bi-star-fill"}></i>, spanStyle: {}},
    {list: "更新日時: ", span: `${boardTime}`, spanStyle: {marginLeft: '4px'}},
  ]
  
  // ボードの情報リストの取得
  const informationList = information.map((list, index) => {
    return (
      <div 
        key={index}
        style={infoListStyle}
      >
        <li>{list.list}</li>
        <span style={list.spanStyle}>
          {list.span}</span>
      </div>
    )
  })

  return (
    <ul style={listStyle}>{informationList}</ul>
  )
}

export default InformationList;