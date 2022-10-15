import React, {useState, useCallback, useEffect} from "react";
import {HomeHeader, Menu, Board} from './components/Homes/index';
import { getUniqueId, date } from "./functions";
// import { update } from "lodash";

const App = () => {
  // -----------------------------------------------------
  // State
  // -----------------------------------------------------
  
  // -----------------------------------------------------
  // ボードの保存
  const [boards, setBoards] = useState(() => {
    const saveText = localStorage.getItem("boards");
    const sampleValue = JSON.parse(saveText);
    return sampleValue || [];
  });
  // const [boards, setBoards] = useState([]);
  
  // -----------------------------------------------------
  // テーマカラーの透明度設定
  const [opacity, setOpacity] = useState(() => {
    const saveText = localStorage.getItem("opacity");
    const sampleValue = JSON.parse(saveText);
    return sampleValue || 1;
  });
  
  // -----------------------------------------------------
  // ボードのテーマカラーの保存
  const [color, setColor] = useState(() => {
    const saveText = localStorage.getItem("color");
    const sampleValue = JSON.parse(saveText);
    return sampleValue || "";
  });
  
  // -----------------------------------------------------
  // テーマカラーの透明度設定
  const [selectOpacity, setSelectOpacity] = useState(1);
  
  // -----------------------------------------------------
  // カラー選択のためのもの
  const [selectColor, setSelectColor] = useState('');
  
  // -----------------------------------------------------
  // ボードの名前保存
  const [value, setValue] = useState("");
  
  // -----------------------------------------------------
  // ボード作成のためのスイッチ
  const [createBoardOpen, setCreateBoardOpen] = useState(false);
  
  // リスト作成のためのスイッチ
  const [createListOpen, setCreateListOpen] = useState(false);

  // -----------------------------------------------------
  // ボードメニューの表示切り替え
  const [isMenu, setIsMenu] = useState(false);
  
  // -----------------------------------------------------
  // Enterキー入力時のスイッチ
  const [composing, setComposition] = useState(false);
  
  // -----------------------------------------------------
  // 検索結果のリスト表示のため
  const [keyword, setKeyword] = useState("")

  // -----------------------------------------------------
  // データのローカルストレージ保存
  // -----------------------------------------------------
  
  // ボードデータ
  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));  
  }, [boards]);
  
  // -----------------------------------------------------
  // カラーデータ
  useEffect(() => {
    localStorage.setItem("color", JSON.stringify(color));  
  }, [color]);
  
  // -----------------------------------------------------
  //  透明度データ
  useEffect(() => {
    localStorage.setItem("opacity", JSON.stringify(opacity));  
  }, [opacity]);
  
  // -----------------------------------------------------
  // Enterキーを入力時の関数 
  // -----------------------------------------------------
  const startComposition = useCallback(() => setComposition(true), [composing])
  const endComposition = useCallback(() => setComposition(false), [composing])

  // -----------------------------------------------------
  // 値保持のための関数
  // -----------------------------------------------------

  // 検索機能の値保持のための関数
  const updateKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, [keyword]);

  // -----------------------------------------------------
  // ボード名の値保持のための関数
  const updateText = useCallback((event) => {
    setValue(event.target.value);
  }, [value]);

  // -----------------------------------------------------
  // カラーの値保持のための関数
  const updateColor = useCallback((event) => {
    setSelectColor(event.target.value);
  }, [setSelectColor])  
  
  // -----------------------------------------------------
  // Opacity保持のための関数
  const opacityAdjust = useCallback((e) => {
    const value = e.target.value / 100;
    setSelectOpacity(value)
  }, [selectOpacity, setSelectOpacity])

  // -----------------------------------------------------
  // 名前の編集時の保持のための関数
  // -----------------------------------------------------

  // ボード
  const updateBoard = useCallback((e, prevBoard) => {
    e.stopPropagation();
    if(e.target.value.trim() === ''){
      alert("ボード名を入力してください");
      e.target.value = prevBoard.title;
      return setValue("")
    }

     // ○重複した名前があたら弾く
    const boardName = boards.map(board => {
      return (board.title)
    })
    boardName.push(e.target.value)
    
    const s = new Set(boardName);
    if(s.size != boardName.length && e.target.value !== prevBoard.title){
      e.target.value = prevBoard.title;
      setValue("")
      return alert("ボード名が重複しています。別の名前を入力してください。")
    }

    // ○ボード名変更後の保存
    const newBoards = boards.map(board => {
      return {
        id: board.id,
        opacity: board.opacity,
        color: board.color,
        isFavorite: board.isFavorite,
        current: board.current,
        lists: board.lists,
        edit: false,
        time: (board === prevBoard ? date() : board.time),
        title: (board === prevBoard ? e.target.value : board.title),
      }
    })
    setBoards(newBoards)
    setValue("")
    e.currentTarget.blur();
  }, [boards, setValue])

  // -----------------------------------------------------
  // アイテム
  const updateItem = (e, prevItem) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.target.value.trim() === ''){
       alert("アイテム名を入力してください");
       e.target.value = prevItem.name;
      return setValue("")
    }

    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        color: board.color,
        edit: board.edit,
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
                current: item.current,
                label: item.label,
                comment: item.comment, 
                checkLists: item.checkLists,
                time: (item.current ? date() : item.time),
                edit: false,
                name: (item === prevItem ? e.target.value  : item.name),
              }
            })
          }
        })
      }
    })
    e.currentTarget.blur();
    setBoards(newBoards);
    setValue("");
  }

  // -----------------------------------------------------
  // 表示切り替えのための関数
  // -----------------------------------------------------

  // メニューの表示切り替えのための関数
  const toggleMenu = useCallback(() => {
    setIsMenu(!isMenu);
  }, [isMenu])

  // -----------------------------------------------------
  // ボードのオプション編集に関する関数
  // -----------------------------------------------------
    
  // お気に入り登録機能
  const toggleFavorite = useCallback((index) => {
    
    const newBoards = [...boards];
    
    const pos = boards.map(list => {
      return list.id;
    }).indexOf(index.id);

    newBoards[pos].isFavorite = !newBoards[pos].isFavorite;
    newBoards[pos].time = date();
    
    setBoards(newBoards)
  }, [boards])

  // -----------------------------------------------------
  // ボードのカラー編集のための関数
  const editBoardColor = useCallback((currentBoard) => {

    const pos = boards.map(board => {
      return board.id}).indexOf(currentBoard.id)

    const newBoards = boards

    newBoards[pos].opacity = selectOpacity;
    newBoards[pos].color = selectColor;
    newBoards[pos].time = date();
    
    setBoards(newBoards);
    setColor(selectColor)
    setSelectColor("")
    setOpacity(selectOpacity)
    setSelectOpacity(1)
  }, [boards, color, selectColor, setOpacity, selectOpacity, setSelectOpacity])

  // -----------------------------------------------------
  // 画面外から表示の操作を行うとき
  const closeSlideOut = (e, setter) => {
    if (e.target === e.currentTarget) {
      setter(false)} else {return}
  }
  
  // -----------------------------------------------------
  // 現在選択されているボード、リスト、アイテムの情報取得のための関数
  // -----------------------------------------------------

  // ボード
  const currentBoard = useCallback((index) => {
    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        time: board.time,
        color: board.color,
        isFavorite: board.isFavorite,
        current: false,
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: list.items.map(item => {
              return {
                id: item.id,
                name: item.name,
                comment: item.comment,
                checkLists: item.checkLists,
                label: item.label,
                edit: item.edit,
                time: item.time,
                current: false
              }
            }),
        }}),
      }
    })
    
    const pos = boards.map(board => {
      return board.id;
    }).indexOf(index.id);
    
    newBoards[pos].current = !newBoards[pos].current;

    setOpacity(newBoards[pos].opacity);
    setColor(newBoards[pos].color);
    setBoards(newBoards)

  }, [boards, setOpacity, setColor])

  // -----------------------------------------------------
  // リスト
  const currentList = useCallback((index, el) => {
    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        color: board.color,
        edit: board.edit,
        time: board.time,
        isFavorite: board.isFavorite,
        current: false,
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: list.items,
        }}),
      }
    })

    // ○指定したボードがどこにあるかを特定
    const pos1 = boards.map(board => {
      return board.id
    }).indexOf(index.id)

    // ○指定したボードの中の指定したリストがどこにあるかを特定
    const pos2 = boards.map(board => {
      return board.lists.map(list => {
        return list.id
      })
    })[pos1].indexOf(el.id)

    newBoards[pos1].current = true;
    newBoards[pos1].lists[pos2].current = true;
    // console.log(newBoards);
    setBoards(newBoards);

  }, [boards])

  // -----------------------------------------------------
  // アイテム
  const currentItem = useCallback((currentBoard, currentList, currentItem) => {
    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        time: board.time,
        color: board.color,
        isFavorite: board.isFavorite,
        current: false,
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: list.items.map(item => {
              return {
                id: item.id,
                name: item.name,
                current: false,
                label: item.label,
                comment: item.comment, 
                time: item.time,
                edit: item.edit,
                checkLists: item.checkLists,
              }
            })
        }}),
      }
    })

    const pos1 = boards.map(board => {
      return board.id
    }).indexOf(currentBoard.id)
    
    const pos2 = boards[pos1].lists.map(list => {
      return list.id
    }).indexOf(currentList.id)
    
    const pos3 = boards[pos1].lists[pos2].items.map(item => {
      return item.id
    }).indexOf(currentItem.id)

    newBoards[pos1].current = true;
    newBoards[pos1].lists[pos2].current = true;
    newBoards[pos1].lists[pos2].items[pos3].current = true;
    setBoards(newBoards)
  }, [boards])

  // -----------------------------------------------------
  // ボード、リスト、アイテムの追加機能のための関数
  // -----------------------------------------------------

  // ボード
  const createBoard = useCallback((e) => {
    e.preventDefault();
    if(value.trim() === '' || selectColor === "") {
      alert("ボード名とカラーを両方指定してから作成してください")
      return;
    }
    
    // ○ボードが一つもないときの処理
    if(boards.length === 0){
      setBoards([{
        id: getUniqueId(),
        title: value,
        opacity: selectOpacity,
        edit: false,
        time: date(),
        color: selectColor,
        isFavorite: false,
        current: true, //　○初期値でカーソル合わせ 
        lists: [{
          id: getUniqueId(), name: "リスト1", current: true, items : [],   
        }],
      }])
    } else {
      // ○重複した名前があったら弾く
      const boardName = boards.map(board => {
        return (board.title)
      })
      boardName.push(value)
      
      const s = new Set(boardName)
      if(s.size != boardName.length){
        setValue("")
        return alert("すでに存在しているボード名です。別の名前を入力してください。")
      }
      
      // ○ボードのリストの取得
      const newLists = boards.map(board => {
        return (board.lists.map(list=> {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: list.items,
          }
        }))
      })
      
      // ○ 作成時のcurrenの保持の為のboardsリセット
      const assets = boards.map((board, index) => {
        return {
          id: board.id,
          title: board.title,
          opacity: board.opacity,
          edit: board.edit,
          time: board.time,
          color: board.color, 
          isFavorite: board.isFavorite,
          current: false, 
          lists: newLists[index], 
        }})
        
      const newBoards = [...assets, {
        id: getUniqueId(),
        title: value,
        opacity: selectOpacity,
        edit: false,
        time: date(),
        color: selectColor,
        isFavorite: false,
        current: true, //　○初期値でカーソル合わせ 
        lists: [{
          id: getUniqueId(), name: "リスト1", current: true, items : [],   
        }],
      }]
      setBoards(newBoards)
    }
      setColor(selectColor)
      setValue("");
      setSelectColor("")
      setCreateBoardOpen(false);
      setOpacity(selectOpacity)
      setSelectOpacity(1)
    }, [boards, value, color, selectColor, setOpacity, selectOpacity]);

  // -----------------------------------------------------
  //  リスト
  const createList = useCallback((e) => {
    e.preventDefault();

    // ○ボードのリストの取得
    const lists = boards.filter(board => {
      return (board.current)
    })
    
    if(value.trim() === ''){
      return alert("リスト名を入力してください");
    }

    // まる重複した名前があたら弾く
    const listName = lists[0].lists.map(list => {
      return (list.name)
    })
    listName.push(value)
    
    const s = new Set(listName);
    if(s.size != listName.length){
      setValue("")
      return alert("リスト名が重複しています。別の名前を入力してください。")
    }

    const newList = [...lists[0].lists.map(list => {
      return {
        id: list.id,
        name: list.name,
        current: false,
        items: list.items,
      }}), {
          id: getUniqueId(),
          name: value,
          current: true,
          items: [],
        }]

    // ○ 作成時のcurrenの保持の為のboardsリセット
    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color, 
        isFavorite: board.isFavorite, 
        current: board.current, 
        time: (board.current ? date() : board.time),
        lists: (board.current ? newList : board.lists)
      }
    })    
    setBoards(newBoards)
    setValue("")
    setCreateListOpen(false);
  }, [boards, value, createListOpen])

  // -----------------------------------------------------
  //  アイテム
  const createItem = useCallback((e) => {
    e.preventDefault();
    if(value.trim() === ''){
      return alert("アイテム名を入力してください")
    }
  
    // ○現在のボードのリスト一覧の取得
    const board = boards.filter(board => {
      return (board.current)
    })
    
    // ○現在のリスト取得
    const lists = board[0].lists.filter(list => {
      return list.current
    })
    
    // ○アイテムの作成
    const newItems = {
      id: getUniqueId(),
      name: value,
      current: true,
      label: "unset",
      time: date(),
      comment: "",
      edit: false,
      checkLists: [],
    }
  
    // ○作成後の全てのボードの情報取得
    const newBoards = boards.map(board => {
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
            items: (!list.current ? list.items.map(item => {
              return {
                id: item.id, 
                name: item.name, 
                comment: item.comment, 
                checkLists: item.checkLists, 
                label: item.label, 
                edit: item.edit, 
                time: item.time, 
                current: false,
              }
            }) 
            : [...list.items.map(item => {
              return {
                id: item.id, 
                name: item.name, 
                comment: item.comment, 
                checkLists: item.checkLists, 
                label: item.label, 
                edit: item.edit, 
                time: item.time, 
                current: false,
              }}), newItems]
            )
          }
        })
      }
    })
    setValue("")
    setBoards(newBoards);
  }, [value, setBoards, setValue])

  // -----------------------------------------------------
  // ボード、リスト、アイテムの削除機能のための関数
  // -----------------------------------------------------

  // ボード
  const deleteBoard = useCallback((e, currentBoard) => {
    // 親要素の関数currentBoardの機能を止める
    e.stopPropagation();
    
    if(!confirm(`ボード:「${currentBoard.title}」を削除してもよろしいですか？\n\n削除すると元に戻す事はできません`)){return;}

    if(boards.length === 1){
      (alert("ボードを追加してください"))
      setColor("")
      setOpacity("")
      return setBoards([])
    }

    const pos = boards.map(board => {
    return board.id
    }).indexOf(currentBoard.id)

  //  BoardsのCurrentの移動のためのIf
    if(pos === 0) {
    boards[pos + 1].current = true;
    setColor(boards[pos + 1].color)
    setOpacity(boards[pos + 1].opacity)
    } else {
    boards.map(board => {
      return board.current = false
    })
    boards[0].current = true;
    setColor(boards[0].color)
    setOpacity(boards[0].opacity)
    }

    setBoards(boards.filter(pint => {
      return (pint.id !== currentBoard.id)
    }))
  }, [boards, setColor, setOpacity])

  // -----------------------------------------------------
  // リスト
  const deleteList = useCallback((e, currentBoard, currentList) => {
    e.stopPropagation();
    if(!confirm(`リスト:「${currentList.name}」を削除してもよろしいですか？\n\n削除すると元に戻す事はできません`)){return}

    if(currentBoard.lists.length === 1){
      return alert(`リストが一つのためこちらの操作を行う事はできません\n \n リスト名： ${currentList.name}`)
    }
    // ○指定したボードの中の指定リストの更新
    const newLists = currentBoard.lists.filter(list => {
      return (list.id !== currentList.id)
    })

    // ○すべてのリストのcurrentをfalseにリセット
    newLists.map(list => {return list.current = false})

    // ○指定したボードの中の指定したリストを更新した後のボード全てを取得
    const newBoards = boards.map((board) => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color,
        isFavorite: board.isFavorite,
        time: (board === currentBoard ? date() : board.time),
        current: (board === currentBoard ? true : board.current),
        lists: (board === currentBoard ? newLists : board.lists),
      }
    })

    // ○削除後に一番初めのリストのcurrentをtrueにする
    const pos1 = boards.map(board  => {
      return board.id
    }).indexOf(currentBoard.id)
      newBoards[pos1].lists[0].current = true;
      setBoards(newBoards)
  }, [boards])

  // -----------------------------------------------------
  // アイテム
  const deleteItem = useCallback((e, currentBoard, currentList, currentItem) => {
    e.stopPropagation();

    if(!confirm(`アイテム:「${currentItem.name}」を削除してもよろしいですか？\n\n削除すると元に戻す事はできません`)){return}

    const newItems = currentList.items.filter(item => {
      return (item.id !== currentItem.id)
    })

    const newBoards = boards.map(board => {
      return {
        id: board.id,
        title: board.title,
        opacity: board.opacity,
        edit: board.edit,
        color: board.color,
        isFavorite: board.isFavorite,
        current: board.current,
        time: (board === currentBoard ? date() : board.time),
        lists: board.lists.map(list => {
          return {
            id: list.id,
            name: list.name,
            current: false,
            items: (list === currentList ? newItems : list.items)
          }
        })
      }
    })
    setBoards(newBoards);
  }, [boards])

  // -----------------------------------------------------
  // ボード、アイテム並び替えのための関数
  // -----------------------------------------------------

  // ボードの並び替え　(BoardMenu)
  const onDragEnd = (result) => {
    
    // ○ドラッグ&ドロップした要素を入れ替える
    const reorder = (lists, startIndex, endIndex) => {
      const result = lists.map(list => list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      return result;
    };
    // ○ドロップ先がない
    if (!result.destination) {
      return;
    }
    // ○配列の順序を入れ替える
    let movedBoards = reorder(
      boards, //　順序を入れ変えたい配列
      result.source.index, // 元の配列の位置
      result.destination.index // 移動先の配列の位置
      );

    setBoards(movedBoards);
  };

  // -----------------------------------------------------
  // リスト間でのアイテムの並び替え
  const onDragEndItems = useCallback((result) => {
    const { draggableId, source, destination } = result

    if(!destination){return}

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {return}
    
    const board = boards.filter(board => {return (board.current)})

    const listId = board[0].lists.map(list => {
      return list.id
    }) // droppableId

    // 移動前のアイテムが何番目にあるかの取得
    const itemId = board[0].lists[listId.indexOf(source.droppableId)].items.map(item => {return item.id}).indexOf(draggableId)

    // ドラッグ開始時のId
    const sourceListId = listId.indexOf(source.droppableId)

    // 移動するアイテムの取得
    const item = board[0].lists[sourceListId].items[itemId]

    // 移動前のリストの取得
    const startList = board[0].lists[listId.indexOf(source.droppableId)]
    // 移動後のリストの取得
    const endList = board[0].lists[listId.indexOf(destination.droppableId)]

    // 移動先が同じリストの場合
    if(startList === endList){
  
      const newItems = startList.items.map(item => {
        return {
          id: item.id, label: item.label, name: item.name, comment: item.comment, edit: item.edit, checkLists: item.checkLists,
          time: (item.current ? date() : item.time), 
          current: false,
        }
      })
      
      newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, item)
      const newLists = board[0].lists.map(list => {
        return {
          id: list.id, name: list.name, current: list.current, 
          items: (list.current ? newItems : list.items)
        }
      })
      
      newItems[destination.index].current = true

      const newBoards = boards.map(board => {
        return {
          id: board.id,
          title: board.title,
          current: board.current,
          opacity: board.opacity,
          color: board.color,
          isFavorite: board.isFavorite,
          edit: board.edit,
          time: (board.current ? date() : board.time),
          lists: (board.current ? newLists : board.lists)
        }
      })
      setBoards(newBoards)
      return 
    } else { // 移動先が違うリストの場合
      // 移動前のアイテム削除
      const startItems = startList.items
      startItems.splice(source.index, 1)
      startItems.map(item => item.current = false);
      // 移動後のアイテム追加
      const endItems = endList.items
      endItems.splice(destination.index, 0, item)
      endItems.map(item => item.current = false);
      // 移動したアイテムにCurrentをつける
      board[0].lists.map(list => {
        return  {
          id: list.id, name: list.name, current: list.current, 
          items: list.items.map(item => {
            return {
              id: item.id, label: item.label, name: item.name, comment: item.comment, edit: item.edit, checkLists: item.checkLists,
              time: (item.current ? date() : item.time), 
              current: false,
            }
          })
        }
      })
      
      item.current = true;
      const newLists = board[0].lists.map(list => {
        return {
          id: list.id, name: list.name,
          current: list.current,
          items: (list === startList ? startItems : (list === endList ? endItems : list.items))
        }
      })

      const newBoards = boards.map(board => {
        return {
          id: board.id, title: board.title, opacity: board.opacity, current: board.current, color: board.color, isFavorite: board.isFavorite, edit: board.edit,
          time: (board.current ? date() : board.time),
          lists: (board.current ? newLists : board.lists),
        }
      })
      setBoards(newBoards)
    }
  }, [boards])

  const style = {
    backgroundColor: `rgba(${color.color1}, ${color.color2}, ${color.color3}, ${opacity})`
  }

  return (
    <div>
      <div>
        <HomeHeader 
          boards={boards}
          keyword={keyword}
          setCreateBoardOpen={setCreateBoardOpen}
          setBoards={setBoards}
          setKeyword={setKeyword}
          closeSlideOut={closeSlideOut}
          currentBoard={currentBoard}
          currentList={currentList}
          currentItem={currentItem}
          updateKeyword={updateKeyword}
        />
        <div 
          className="work-space"
          style={style}
        > 
          <Menu 
            boards={boards}
            createBoardOpen={createBoardOpen}
            color={color}
            isMenu={isMenu}
            selectColor={selectColor}
            selectOpacity={selectOpacity}
            value={value}
            setBoards={setBoards}
            setCreateBoardOpen={setCreateBoardOpen}
            setValue={setValue}
            setSelectOpacity={setSelectOpacity}
            setSelectColor={setSelectColor}
            createBoard={createBoard}
            currentBoard={currentBoard}
            deleteBoard={deleteBoard}
            opacityAdjust={opacityAdjust}
            onDragEnd={onDragEnd}
            toggleFavorite={toggleFavorite}
            toggleMenu={toggleMenu}
            updateBoard={updateBoard}
            updateColor={updateColor}
            updateText={updateText}
            composing={composing}
            startComposition={startComposition}
            endComposition={endComposition}
            />
          <Board 
            boards={boards}
            color={color}
            isMenu={isMenu}
            createListOpen={createListOpen}
            value={value}
            selectColor={selectColor}
            selectOpacity={selectOpacity}
            setBoards={setBoards}
            setCreateListOpen={setCreateListOpen}
            setSelectColor={setSelectColor}
            setSelectOpacity={setSelectOpacity}
            setValue={setValue}
            createItem={createItem}
            createList={createList}
            currentItem={currentItem}
            currentList={currentList}
            deleteBoard={deleteBoard}
            deleteItem={deleteItem}
            deleteList={deleteList}
            editBoardColor={editBoardColor}
            onDragEndItems={onDragEndItems}
            opacityAdjust={opacityAdjust}
            toggleFavorite={toggleFavorite}
            updateColor={updateColor}
            updateBoard={updateBoard}
            updateItem={updateItem}
            updateText={updateText}
            composing={composing}
            startComposition={startComposition}
            endComposition={endComposition}
          />
        </div>
      </div>
    </div>
  )
}

export default App;