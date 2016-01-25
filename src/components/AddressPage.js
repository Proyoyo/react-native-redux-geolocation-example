'use strict';

import React, {Component, View, Text, StyleSheet} from 'react-native';

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    }
});

export default class AddressPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        var latitude = this.props.location.geometry.location.lat;
        var longitude = this.props.location.geometry.location.lng;
        return(
            <View style = {styles.container}>
                <Text>lat: {latitude} {'\n'}
                    long: {longitude}</Text>
            </View>
        );
    }
}
