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
    render(){
        console.log(this.props)
        return(
            <View style = {styles.container}>
                <Text>lat: {this.props.location.geometry.location.lat} {'\n'}
                    long: {this.props.location.geometry.location.lng}</Text>
            </View>
        );
    }
}
