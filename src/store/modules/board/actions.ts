/* eslint-disable */
import api from '../../../api/request';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";
import { isStringValid } from '../../../common/commonFunctions';

export const getBoard = () => async (dispatch: Dispatch, id:string) => {
  try {
    // @ts-ignore
    const  board  = await api.get(`/board/${id}`);
    console.log(board)
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
async function addNewList(title: string, id:string, position:number){
  console.log(title, id, position)
  try{
    const postResult = await api.post(`board/${id}/list`,{
      title: title,
      position: position,
    })
    console.log(postResult)
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
        addNewList(title, id, position).then(()=>getBoard()(dispatch, id));
      }else{
        creationError()
      }
    },
    saveListTitle(title){
      dispatch({type: "SAVE_LIST_TITLE", payload: title})
    }

  }
}
export const delList = () => async (dispatch: Dispatch, boardId:string, listId:string) => {
  console.log(boardId, listId);
  try {
    const  board  = await api.delete(`/board/${boardId}/list/${listId}`).then(()=>getBoard()(dispatch, boardId ));
    console.log(board)
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};