import { UPDATE_SEO_POSITIONS, BEGIN_UPDATE_SEO_POSITIONS } from '../actions/index'

const initialState = {
    result: '',
    isFetching: false
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEO_POSITIONS:
            const res = action.positions.length === 0 ? '0' : action.positions.map(i => i.toString()).join(', ');
            return { ...state, ...{ result: res, isFetching: false }};
        case BEGIN_UPDATE_SEO_POSITIONS:
            return { ...state, ...{ isFetching: true }};
        default:
            return state;
    }
};

export default resultReducer;