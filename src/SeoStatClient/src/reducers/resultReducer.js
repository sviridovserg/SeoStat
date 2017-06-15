import { UPDATE_SEO_POSITIONS } from '../actions/index'

const initialState = {
    result: ''
};

const paramsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEO_POSITIONS:
            const res = action.positions.length === 0 ? '' : action.positions.map(i => i.toString()).join(', ');
            return { ...state, ...{ result: res }};
        default:
            return state;
    }
};

export default paramsReducer;