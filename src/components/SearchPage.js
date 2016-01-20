'use strict';

import React, {View, Text, Component, TouchableHighlight, TextInput, ListView, ActivityIndicatorIOS} from 'react-native';
import _ from 'lodash';

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    searchContainer: {
        marginTop: 80,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },

    address: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    }

});


class SearchPage extends Component {



    constructor(props){
        super(props);
        this.state = {
            locationData: new ListView.DataSource({
                rowHasChanged: (row1, row2) => !_.isEqual(row1, row2)
            })
        };

        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.onSearchPressed = this.onSearchPressed.bind(this);
        this.renderLocations = this.renderLocations.bind(this);
    }

    componentDidMount(){
    }

    onSearchTextChanged(event){
        this.props.boundActionCreators.updateSearchInput(event.nativeEvent.text);
    }

    onSearchPressed(){
        var query = this.props.searchField.split(' ').join('+');
        this.props.boundActionCreators.fetchLocation(query);
    }

    renderLocations(location){
        let response = this.props.response;
        let Actions = this.props.routes;
        //console.log("LOCATION IS")
        //console.log(location)
        return(
            <View>
                <View style = {styles.address}>
                    <TouchableHighlight
                        underlayColor = '#99d9f4'
                        onPress = {() => Actions.addressPage({location: location})}>
                        <Text> {location.formatted_address} </Text>
                    </TouchableHighlight>

                </View>
                <View style = {styles.separator}/>
            </View>

        );
    }



  render(){
      let response = this.props.response
      var spinner = this.props.isFetching ?
        ( <ActivityIndicatorIOS
        hidden = 'true'
        size = 'large'/> ) :
        ( <View/> );
    return (
        <View style = {styles.container}>
            <View style = {styles.searchContainer}>
                <TextInput
                    style = {styles.searchInput}
                    value = {this.props.searchField}
                    onChange = {this.onSearchTextChanged}
                    placeholder = 'Search address'/>
                <TouchableHighlight style = {styles.button}
                    underlayColor = '#99d9f4'
                    onPress = {this.onSearchPressed}>
                    <Text style = {styles.buttonText}>Go</Text>
                </TouchableHighlight>
            </View>
            {spinner}
            <ListView
                dataSource = {this.state.locationData.cloneWithRows(this.props.response)}
                renderRow = {this.renderLocations}
            />


        </View>
    );
  }
}

module.exports = SearchPage
