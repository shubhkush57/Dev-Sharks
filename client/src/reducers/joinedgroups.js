import { GET_JOIN_GROUP_FAIL,GET_JOIN_GROUP_SUCCESS,GROUP_CREATE_SUCCESS,GROUP_CREATE_FAIL} from "../actions/types";
const initialState = {
    group: [],
};

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case GET_JOIN_GROUP_SUCCESS:
            return {
                ...state,
                group: payload,
            }
        case GROUP_CREATE_SUCCESS:
            return {
                ...state,
            }
        default:
            return state;
    }
};