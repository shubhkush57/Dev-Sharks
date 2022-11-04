import { GROUP_CREATE_FAIL,GROUP_CREATE_SUCCESS,GET_USER_CREATED_GROUPS,GET_USER_CREATED_GROUPS_CHECK } from "./types";
import axios from 'axios';
import {setAlert} from './alert';

export const creategroup = ({
    title,
    descp,
    tags,
})=> async (dispatch)=>{
    const config = {
        headers:{
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({title,descp,tags});
    try{
        console.log('Group is going to crate');
        const res = await axios.post('/api/group/create',body,config);
        console.log('Group created');
        dispatch({
            type: GROUP_CREATE_SUCCESS,
            payload: res.data,
        });
    }
    catch(error){
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error)=> dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: GROUP_CREATE_FAIL,
        });
    }
};

export const getCreatedGroups = () => async dispatch =>{
    try{
        console.log('getting data from backend....');
        
        const res = await axios.get('/api/group');
        console.log('got the data from backend....');
        console.log(res.data);
        dispatch({
            type: GET_USER_CREATED_GROUPS,
            payload: res.data,
        })
    }catch(error){
        console.log(error);
    }
};