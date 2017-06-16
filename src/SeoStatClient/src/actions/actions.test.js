import * as actions from './index'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const url = 'exmaple.com';
        const expectedAction = {
            type: actions.CHANGE_URL,
            url
        }
        expect(actions.changeURL(url)).toEqual(expectedAction);
    });


    afterEach(() => {
        nock.cleanAll()
    });

    it ('creates UPDATE_SEO_POSITIONS after result is returned', () => {
        nock('http://localhost:50516')
            .get('/api/seo?url=example.com&keywords=example')
            .reply(200, [1]);
        const expectedActions = [
            { type: actions.BEGIN_UPDATE_SEO_POSITIONS },
            { type: actions.UPDATE_SEO_POSITIONS, positions: [1] },
            { type: actions.END_UPDATE_SEO_POSITIONS }
        ]
        const store = mockStore({ result: {result: []}  })

        store.dispatch(actions.updateSeoPositions('example.com', 'example')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it ('creates END_UPDATE_SEO_POSITIONS if fetch positions failed', () => {
        const expectedActions = [
            { type: actions.BEGIN_UPDATE_SEO_POSITIONS },
            { type: actions.END_UPDATE_SEO_POSITIONS },
            { type: actions.SET_ERROR, error: 'An error occured during processing of yor request' }
        ]
        const store = mockStore({ result: {result: []}  })

        store.dispatch(actions.updateSeoPositions('example.com', 'example')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
})