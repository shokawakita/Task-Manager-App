import React, {useState, useCallback} from "react";
import {FindText, FavoriteList, RecentlyList} from './index';

const HomeHeader = (props) => {

  // お気に入り登録リストの表示
  const [favoOpen, setFavoOpen] = useState(false);

  // アクティビティリストの表示
  const [recent, setRecent] = useState(false);

  // 検索結果のリストの表示
  const [find, setFind] = useState(false);

  // お気に入りリストOPEN
  const favoriteListOpen = useCallback(() => {
    props.setCreateBoardOpen(false);
    setFavoOpen(true);
  }, [setFavoOpen])

  // お気に入りリストCLOSE
  const favoriteListClose = useCallback(() => {
    setFavoOpen(false);
  }, [setFavoOpen])

  // アクティビティリストOpen
  const recentlyListOpen = useCallback(() => {
    setRecent(true);
  },[setRecent])

  // アクティビティリストClose
  const recentlyListClose = useCallback(() => {
    setRecent(false);
  },[setRecent])

  return (
    <header className="home-header">
      <div className="header-list1">
        <h1><span><i className="bi bi-pencil"></i></span>My Todos</h1>

        <nav className="home-header-menu">
          <ul>
             <li onClick={recentlyListOpen}>
                最近
                <span><i className="bi bi-chevron-down"></i></span>
            </li>
             <li onClick={favoriteListOpen}>
                お気に入り
                <span><i className="bi bi-chevron-down"></i></span>
            </li>
          </ul>
        </nav>
        <RecentlyList
          boards={props.boards}
          recent={recent}
          recentlyListClose={recentlyListClose}
          setBoards={props.setBoards}
          setRecent={setRecent}
          currentBoard={props.currentBoard}
          currentList={props.currentList}
          currentItem={props.currentItem}
        />

        <FavoriteList
          boards={props.boards}
          favoOpen={favoOpen}
          setFavoOpen={setFavoOpen}
          currentBoard={props.currentBoard}
          favoriteListClose={favoriteListClose}
          />
      </div>


      <div className="header-list2">
        <FindText 
          boards={props.boards}
          find={find}
          keyword={props.keyword}
          setFind={setFind}
          setKeyword={props.setKeyword}
          closeSlideOut={props.closeSlideOut}
          currentBoard={props.currentBoard}
          currentList={props.currentList}
          currentItem={props.currentItem}
          updateKeyword={props.updateKeyword}
        />
  
        <div className="notification">
          <span><i className="bi bi-bell"></i></span>
        </div>

        <div className="user-icon">
          <span><i className="bi bi-person-circle"></i></span>
        </div>

      </div>
    </header>
  );
}

export default HomeHeader;