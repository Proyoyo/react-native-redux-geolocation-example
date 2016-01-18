'use strict';

var NavigationBar = require('react-native-navbar');
var React = require('react-native');
var {StyleSheet,View} = React;
var {Router, Route, Animations, Schema} = require('react-native-redux-router');

class NavBarBase extends React.Component {
   onPrev(){
       var Actions = this.props.routes;
       if (this.props.onPrev){
           this.props.onPrev();
           return;
       }
       if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
           Actions.pop();
       }
   }
   render() {
       var Actions = this.props.routes;
       return <NavigationBar style={styles.navBar}
                             buttonsColor='white'
                             statusBar= {{style:'default', hidden: false}}
                             title= {{title:this.props.title, tintColor: '#fff'}}
                             leftButton = {this.props.leftButton ? this.props.leftButton : {title:''}}
                             rightButton = {this.props.rightButton ? this.props.rightButton : {title:''}}
           />
   }
}
class NavBar extends React.Component {
   render() {
     var Actions = this.props.routes;
     return <NavBarBase customNext={<View/>} {...this.props} leftButton={{title:'Back', handler:this.props.onPrev || Actions.pop}}/>
   }
}


class NavBarModal extends React.Component {
   render() {
     var Actions = this.props.routes;
     return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props} rightButton={{title:'Close', handler:this.props.onNext || Actions.pop}}/>
   }
}

var styles = StyleSheet.create({
   navBar: {
       backgroundColor: '#48BBEC'
   },
});


module.exports = {NavBar, NavBarModal};
