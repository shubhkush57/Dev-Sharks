import{
    LOAD_GROUPS,
    LOADING_GROUPS,
}from '../actions/types';
const initialState = {
    groups :[],
    loading: false,
}

export default function (state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case LOAD_GROUPS:
            return {
                ...state,
                groups: payload,
            };
        case LOADING_GROUPS:
            return{
                ...state,
                loading: payload,
            };
        default:
            return state;
    }
}