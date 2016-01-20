import expect from 'expect';
import * as actions from '../src/actions/findActions';
import * as types from '../src/actions/actionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
require('es6-promise').polyfill();
require('isomorphic-fetch');

describe('Request Update', () => {
    it('should request an update', () => {
        const address = '46 Clarendon Street';
        const expectedAction = {
            type: types.REQUESTUPDATE,
            address
        };
        expect(actions.requestUpdate(address)).toEqual(expectedAction);
    });
});

describe('Receive Update', () => {
    it('should receive an update and parse the value', () => {
        const address = '46 Clarendon Street';
        const response =    {
                                "results" : [
                                    {
                                        "formatted_address" : "151 City Rd, Perkinston, MS 39573, USA",
                                        "place_id" : "EiYxNTEgQ2l0eSBSZCwgUGVya2luc3RvbiwgTVMgMzk1NzMsIFVTQQ"
                                    },
                                    {
                                        "formatted_address" : "151 City Rd, Merewether NSW 2291, Australia",
                                        "place_id" : "ChIJd7qPws0Vc2sR6PJg_RBLdwg"
                                    }
                                ],
                                "status" : "OK"
                            };
        const parsedResponse = [
                                    {
                                        "formatted_address" : "151 City Rd, Perkinston, MS 39573, USA",
                                        "place_id" : "EiYxNTEgQ2l0eSBSZCwgUGVya2luc3RvbiwgTVMgMzk1NzMsIFVTQQ"
                                    },
                                    {
                                        "formatted_address" : "151 City Rd, Merewether NSW 2291, Australia",
                                        "place_id" : "ChIJd7qPws0Vc2sR6PJg_RBLdwg"
                                    }
                                ];
        const expectedAction = {
            type: types.RECEIVEUPDATE,
            address,
            response: parsedResponse
        };
        expect(actions.receiveUpdate(address, response)).toEqual(expectedAction);
    });
});

describe('Change Search Input', () => {
    it('should update search input', () => {
        const input = '151 City Road';
        const expectedAction = {
            type: types.UPDATESEARCHINPUT,
            input
        };
        expect(actions.updateSearchInput(input)).toEqual(expectedAction);
    });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Fetch Action', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('calls request update before and receive update after', (done) => {

        const address = '46+Clarendon+Street';

        const parsedResponse = [
                                    {
                                        "formatted_address" : "151 City Rd, Perkinston, MS 39573, USA",
                                        "place_id" : "EiYxNTEgQ2l0eSBSZCwgUGVya2luc3RvbiwgTVMgMzk1NzMsIFVTQQ"
                                    },
                                    {
                                        "formatted_address" : "151 City Rd, Merewether NSW 2291, Australia",
                                        "place_id" : "ChIJd7qPws0Vc2sR6PJg_RBLdwg"
                                    }
                                ];

        nock('https://maps.googleapis.com/')
        .get('/maps/api/geocode/json?&encoding=json&address=46+Clarendon+Street')
        .reply(200, { "results" : [
                            {
                                "formatted_address" : "151 City Rd, Perkinston, MS 39573, USA",
                                "place_id" : "EiYxNTEgQ2l0eSBSZCwgUGVya2luc3RvbiwgTVMgMzk1NzMsIFVTQQ"
                            },
                            {
                                "formatted_address" : "151 City Rd, Merewether NSW 2291, Australia",
                                "place_id" : "ChIJd7qPws0Vc2sR6PJg_RBLdwg"
                            }
                        ],
                        "status" : "OK"
                    })

        const expectedActions = [
            {
                type: types.REQUESTUPDATE,
                address
            },
            {
                type: types.RECEIVEUPDATE,
                address,
                response: parsedResponse
            }
        ]
        const store = mockStore({}, expectedActions, done());
        store.dispatch(actions.fetchLocation('46+Clarendon+Street'));
    })
});
