import expect from 'expect';
import reverseGeo from '../src/reducers/reverse';
import * as types from '../src/actions/actionTypes';

describe('Reducer Test', () => {
    it('should initialize state', () => {
        expect(
            reverseGeo(undefined, {})
        ).toEqual({
            response: {},
            isFetching: false,
            searchField: '151 City Road'
        })
    });

    it('should handle request update', () => {
        expect(
            reverseGeo(undefined, {type: types.REQUESTUPDATE})
        ).toEqual({
            response: {},
            isFetching: true,
            searchField: '151 City Road'
        })
    });

    it('should handle receive update', () => {
        expect(
            reverseGeo(undefined, {type: types.RECEIVEUPDATE, response: {"address": "151 City Road"}})
        ).toEqual({
            response: {"address": "151 City Road"},
            isFetching: false,
            searchField: '151 City Road'
        })
    });

    it('should update search input', () => {
        expect(
            reverseGeo(undefined, {type: types.UPDATESEARCHINPUT, input: "300 Lonsdale Street"})
        ).toEqual({
            response: {},
            isFetching: false,
            searchField: '300 Lonsdale Street'
        })
    });


});
