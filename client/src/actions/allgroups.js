import { GROUP_CREATE_FAIL,GROUP_CREATE_SUCCESS,GET_USER_CREATED_GROUPS,GET_USER_CREATED_GROUPS_CHECK ,GET_ALL_GROUPS_SUCCESS,GET_ALL_GROUP_FAIL} from "./types";
import axios from 'axios';
import {setAlert} from './alert';

export const getAllGroups = () => async dispatch =>{
    try{
        console.log('getting data of all groups .....');
        
        const res = await axios.get('/api/group/all');
        console.log(res.data);
        dispatch({
            type: GET_ALL_GROUPS_SUCCESS,
            payload: res.data,
        })
    }catch(error){
        console.log(error);
    }
};