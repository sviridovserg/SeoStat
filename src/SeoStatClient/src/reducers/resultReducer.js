import { UPDATE_SEO_POSITIONS, BEGIN_UPDATE_SEO_POSITIONS, END_UPDATE_SEO_POSITIONS } from '../actions/index'

const initialState = {
    result: '',
    isFetching: false
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEO_POSITIONS:
            const res = action.positions.length === 0 ? '0' : action.positions.map(i => i.toString()).join(', ');
            return { ...state, ...{ result: res }};
        case BEGIN_UPDATE_SEO_POSITIONS:
            return { ...state, ...{ isFetching: true }};
        case END_UPDATE_SEO_POSITIONS:
            return { ...state, ...{ isFetching: false }};
        default:
            return state;
    }
};

export default resultReducer;