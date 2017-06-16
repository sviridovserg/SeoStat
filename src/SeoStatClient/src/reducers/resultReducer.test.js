import reducer from './resultReducer'
import * as actions from '../actions'

describe('result reducer', () => {
    it ('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            result: '',
            isFetching: false
        });
    });

    it ('should return "0" if UPDATE_SEO_POSITIONS has no positions', () => {
        expect(reducer(undefined, {
            type: actions.UPDATE_SEO_POSITIONS,
            positions: []
        })).toEqual({
            result: '0',
            isFetching: false
        });
    });

    it ('should return string of positions if UPDATE_SEO_POSITIONS has positions', () => {
        expect(reducer(undefined, {
            type: actions.UPDATE_SEO_POSITIONS,
            positions: [2, 5, 35]
        })).toEqual({
            result: '2, 5, 35',
            isFetching: false
        });
    });

    it ('should return change isFetching to false when END_UPDATE_SEO_POSITIONS', () => {
        expect(reducer({
            isFetching: true,
            result: '2, 5, 35'
        }, {
            type: actions.END_UPDATE_SEO_POSITIONS
        })).toEqual({
            result: '2, 5, 35',
            isFetching: false
        });
    });

    it('should change isFetching to true on BEGIN_UPDATE_SEO_POSITIONS', () => {
        expect(reducer(undefined, {
            type: actions.BEGIN_UPDATE_SEO_POSITIONS
        })).toEqual({
            result: '',
            isFetching: true
        });
    });
});