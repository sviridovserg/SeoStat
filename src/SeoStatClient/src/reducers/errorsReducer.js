import { SET_ERROR, REMOVE_ERROR } from '../actions'

const initialState = {
    error: ''
}

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return { ...state, ...{ error: action.error }};
        case REMOVE_ERROR:
            return { ...state, ...{ error: '' }};
        default:
            return state;
    }
};

export default errorsReducer;