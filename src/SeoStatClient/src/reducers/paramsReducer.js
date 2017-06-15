import { CHANGE_URL, CHANGE_KEYWORDS } from '../actions/index'

const initialState = {
    url: '',
    keywords: '',
};

const paramsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_URL:
            return { ...state, ...{ url: action.url }};
        case CHANGE_KEYWORDS:
            return { ...state, ...{ keywords: action.keywords }};
        default:
            return state;
    }
};

export default paramsReducer;