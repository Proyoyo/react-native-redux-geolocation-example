import * as types from '../actions/actionTypes';

const initialState = {
    response: {},
    isFetching: false,
    searchField: '151 City Road'
};

export default function reverseGeo(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUESTUPDATE:
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVEUPDATE:
            return {
                ...state,
                response: action.response,
                isFetching: false
            };
        case types.UPDATESEARCHINPUT:
            return {
                ...state,
                searchField: action.input
            }
        default:
            return state;
    }
}
