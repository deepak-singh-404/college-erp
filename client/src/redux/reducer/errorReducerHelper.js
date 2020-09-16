import { SET_ERRORS_HELPER } from '../actionTypes';

const initialState = {};

const setErrorsHelper = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS_HELPER:
            return action.payload;
        default:
            return state;
    }
}


export default setErrorsHelper


