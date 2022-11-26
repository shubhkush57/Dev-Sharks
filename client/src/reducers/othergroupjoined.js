import { GET_JOIN_GROUP_FAIL,GET_JOIN_GROUP_SUCCESS,GROUP_CREATE_SUCCESS,GROUP_CREATE_FAIL,GROUP_JOIN_SUCCESS,GROUP_JOIN_FAIL} from "../actions/types";
const initialState = {
    group: [],
};

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case GROUP_JOIN_SUCCESS:
            return {
                ...state,
            }
        default:
            return state;
    }
};