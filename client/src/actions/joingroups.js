import { GET_JOIN_GROUP_FAIL,GET_JOIN_GROUP_SUCCESS,GROUP_JOIN_FAIL,GROUP_JOIN_SUCCESS } from "./types";
import axios from 'axios';
import { setAlert } from "./alert";

export const joinGroup = (group) => async (dispatch) =>{
    // console.log('form the action groups....');
    // console.log(group);
    const config = {
        headers:{
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({group});
    console.log(body);
    try{
        
        const res = await axios.post('/api/group/join',body,config);
        console.log('Group Joined');
        dispatch({
            type: GROUP_JOIN_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert('Group Joined By You','success'));
    }
    catch(error){
        console.log(error.message);
    }
};

//---jiohkjkhk
export const getUserJoinedGroup = ()=> async dispatch =>{
    try{
        console.log('getting the data of joined group in frontedn');
        const res = await axios.get('/api/group/join');
        console.log(res.data);
        dispatch({
            type: GET_JOIN_GROUP_SUCCESS,
            payload: res.data,
        })
    }
    catch(error){
        dispatch({
            type: GET_JOIN_GROUP_FAIL,
            payload: {msg: error.response.statusText,status:error.response.status}
        });
    }
}
