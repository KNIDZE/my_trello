/* eslint-disable */
import api from '../../../api/request';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";
import { isStringValid } from '../../../common/commonFunctions';

interface Board{
  title: string;
  lists: [{id: number; position:number}];
}
function changeListsPosition(board: Board): {id: number; position:number}[]{
  const result = []
  for (let i = 0; i < board.lists.length; i++) {
    const changeList = {id: board.lists[i].id, position: (i+1)}
    result.push(changeList)
  }
  return result;


}
export const getBoard = () => async (dispatch: Dispatch, id:string) => {
  try {
    // @ts-ignore
    let  board: Board  = await api.get(`/board/${id}`);
    const results = await api.put(`/board/${id}/list`,changeListsPosition(board))
    board  = await api.get(`/board/${id}`);
    await dispatch({ type: 'LOAD_BOARD', payload: board });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
interface BoardElements{
  turnListButton: ()=>void;
  createList: (title: string,  id:string, position:number)=>void;
  saveListTitle: (title:string)=>void;
}
function creationError(){
  alert("It's not valid string")
}


async function addNewList(title: string, id:string, position:number, dispatch: Dispatch){
  try{
    const postResult = await api.post(`board/${id}/list`,{
      title: title,
      position: position,
    })
    dispatch({type:"CHANGE_ADD_BOARD"})
  }catch (e){
    console.log(e);
    }
}
export function addBoardElements(dispatch: Dispatch): BoardElements {
  return {
    turnListButton: ()=>{
      dispatch({type: "CHANGE_ADD_BOARD"})
    },
    createList: (title, id, position)=>{
      if (isStringValid(title)){
        addNewList(title, id, position, dispatch).then(()=>getBoard()(dispatch, id));
      }else{
        creationError()
      }
    },
    saveListTitle(title){
      dispatch({type: "SAVE_LIST_TITLE", payload: title})
    }

  }
}

export async function delList (dispatch: Dispatch, boardId:string, listId:string){
  try {
    await api.delete(`/board/${boardId}/list/${listId}`).then(()=>getBoard()(dispatch, boardId ));
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
export async function renameList (dispatch: Dispatch, title:string, listId:string, boardId:string){
  try {
    await api.put(`/board/${boardId}/list/${listId}`);
    getBoard()(dispatch, boardId );
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
function renameRequest(title:string, boardId: string, dispatch:Dispatch){
  api.put(`/board/${boardId}`,
    {
      title: title,
      custom:{}
    }).then(()=>getBoard()(dispatch, boardId))
}
export function boardFunctions(dispatch: Dispatch): {renameBoard(title: string, boardId:string): void} {
  return {
    renameBoard: (title, boardId: string)=>{
      if (isStringValid(title)){
        renameRequest(title, boardId, dispatch)
      }else{
        creationError();
      }
    },
  }
}