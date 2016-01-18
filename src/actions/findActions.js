import * as types from './actionTypes';

module.exports.requestUpdate = function requestUpdate(address){
    console.log('REQUESTING')
    return {
        type: types.REQUESTUPDATE,
        address
    };
}

module.exports.receiveUpdate = function receiveUpdate(address, json){
    //console.log('RECEIVED')
    //console.log(json)

    var locationList = [];
    for(i = 0; i < json.results.length; i++){
        locationList.push(json.results[i])

    }
    //console.log(locationList.length)
    return {
        type: types.RECEIVEUPDATE,
        address,
        response: locationList
    };
}

module.exports.updateSearchInput = function updateSearchInput(input){
    return {
        type: types.UPDATESEARCHINPUT,
        input
    }
}

module.exports.fetchLocation = function fetchLocation(address){
    console.log('FETCHING')
    return dispatch => {
        dispatch(exports.requestUpdate(address))
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?&encoding=json&address=${address}`)
        .then(response => response.json())
        .then(json => dispatch(exports.receiveUpdate(address, json)))
        .catch((error) => {
            console.warn(error);
        })
    }
}
