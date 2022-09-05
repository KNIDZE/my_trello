/* eslint-disable */
import api from "../../../api"
import config from '../../../common/constants/api';
import {Dispatch} from "redux";

export const getBoards = () => async (dispatch: Dispatch) => {
  try {
    const { boards } = await api.get("/board");
    await dispatch({type: 'UPDATE_BOARDS', payload: boards});
  } catch (e) {
    console.log(e)
    dispatch({type: 'ERROR_ACTION_TYPE'});
  }
}
