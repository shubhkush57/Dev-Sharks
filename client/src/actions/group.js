import {
    LOAD_GROUPS,
    LOADING_GROUPS,
}from '../actions/types';

export const setGroups = (groups) => (dispatch) =>{
    dispatch({
        type: LOAD_GROUPS,
        payload: groups,
    });
}
export const setLoading = (value) =>(dispatch) =>{
    dispatch({
        type: LOADING_GROUPS,
        payload: value,
    });
};