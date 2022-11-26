import { GET_JOIN_GROUP_FAIL,GET_JOIN_GROUP_SUCCESS,GROUP_JOIN_FAIL,GROUP_JOIN_SUCCESS } from "./types";
import axios from 'axios';
import { setAlert } from "./alert";

export const joinGroup = ({_id }) => async (dispatch) =>{
    // console.log('form the action groups....');
    // console.log(group);
    const config = {
        headers:{
            'Content-Type': 'application/json',
        },
    };
    console.log('IN the actions.........');
    // const body = JSON.stringify( { _id } );
    console.log(typeof({_id}));
    try{
        console.log('Clicked on Join Group');
        const res = await axios.post('/api/group/join',{ id: _id },config);
        console.log('Group Joined');
        dispatch({
            type: GROUP_JOIN_SUCCESS,
            // payload: res.data,
        });
        dispatch(setAlert('Group Joined By You','success'));
    }
    catch(error){
        console.log('error in the actions of join');
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
