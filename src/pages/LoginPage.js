import React, { Component } from 'react';
import { View, StyleSheet,  } from 'react-native';
import Login from './Login';
import Loading from './Loading';
import IDcard from './IDCard';
import GLOBAL from '../global/global.js';


export default class LoginPage extends Component {

  constructor() {
    super();
    this.state = { loggedIn:GLOBAL.LOGGED_IN };
    GLOBAL.LoginPage = this;
  }

  setLoginStatus = () => {
    this.setState({loggedIn:GLOBAL.LOGGED_IN});
  }

  renderContent = () =>{
    switch(this.state.loggedIn){
      case false:
        return  <Login/>
              
      case true:
           return <IDcard/>

           default:
             return <Loading/>

    }
  }
  render(){
    return (
      <View style={styles.container}>
       {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      height:'100%',
      width:'100%'
    
    },
});