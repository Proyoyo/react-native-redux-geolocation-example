'use strict';

import React, { Component, View, Navigator, Text } from 'react-native';
import {Router, Route, Schema, Animations} from 'react-native-redux-router';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/findActions';
import SearchPage from '../components/SearchPage';
import AddressPage from '../components/AddressPage';
import { connect } from 'react-redux/native';
import {NavBar, NavBarModal} from '../components/NavBar';

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
    response: state.reverseGeo.response,
    isFetching: state.reverseGeo.isFetching,
    searchField: state.reverseGeo.searchField,
    route: state.routes
});

const mapDispatchToProps = (dispatch) => ({
    boundActionCreators: bindActionCreators({
        ...searchActions
    }, dispatch)
});

class ReverseApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <Router>
                <Schema name = "modal" sceneConfig = {Animations.FlatFloatFromBottom} navBar = {NavBarModal}/>
                <Schema name = "default" sceneConfig = {Animations.FlatFloatFromRight} navBar = {NavBar}/>
                <Schema name = "withoutAnimation" navBar = {NavBar}/>

                <Route name = "searchPage" component = {connect(mapStateToProps, mapDispatchToProps)(SearchPage)} title = "Search Page" hideNavBar = {true} initial = {true}/>
                <Route name = "addressPage" component = {AddressPage} title = "Address Page" schema = "default" />
            </Router>
        );
    }
}

module.exports = ReverseApp;
