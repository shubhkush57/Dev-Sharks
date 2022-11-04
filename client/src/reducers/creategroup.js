import { GROUP_CREATE_FAIL,GROUP,CREATE,SUCCESS, GROUP_CREATE_SUCCESS,GET_USER_CREATED_GROUPS,GET_USER_CREATED_GROUPS_CHECK } from "../actions/types";
const initialState = {
    group: [],
};

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case GROUP_CREATE_FAIL:
            return{
                ...state,
                error: payload,
                loading: false,
            }
        case GROUP_CREATE_SUCCESS:
            return{
                ...state,
            }
        case GET_USER_CREATED_GROUPS:
            return{
                ...state,
                group: payload,
            };
        default:
            return state;
    }
}
