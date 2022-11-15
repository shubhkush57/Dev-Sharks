import { GROUP_CREATE_FAIL,GROUP,CREATE,SUCCESS, GROUP_CREATE_SUCCESS,GET_USER_CREATED_GROUPS,GET_USER_CREATED_GROUPS_CHECK,GET_ALL_GROUPS_SUCCESS,GET_ALL_GROUP_FAIL } from "../actions/types";
const initialState = {
    group: [],
};

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case GET_ALL_GROUP_FAIL:
            return{
                ...state,
                error: payload,
                loading: false,
            }
        case GET_ALL_GROUPS_SUCCESS:
            return{
                ...state,
                group: payload,
            }
        default:
            return state;
    }
}