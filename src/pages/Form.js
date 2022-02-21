import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import 'react-native-gesture-handler';
import GLOBAL from '../global/global.js';
import MyLoading from '../global/MyLoading';


export default class Form extends Component{

    constructor(props) {
        super();
        this.props = props;
    }

    state={
        email:'',
        password:'',
        error:'',
        loading:false
    }


    _promisedSetState = (newState) => {
        return new Promise((resolve) => {
          this.setState(newState, () => {
            resolve();
          });
        });
    }

    onBottomPress = () =>{        
        this.setState((oldState) => {
            let x = Object.assign({}, oldState);
            x.loading = true;
            return x;
        })

        fetch("https://fypproject.greenpixi.com/api/login", {
            method: "POST",
            headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": this.state.email,
              "password": this.state.password,
            })
          })
          .then(response => response.json())
          .then((response) => {
            if (response.error === false) { 
                GLOBAL.LOGGED_IN = true;
                GLOBAL.AUTH = response;
                let oldState = Object.assign({}, this.state);
                oldState.loading = false;
                this._promisedSetState(oldState)
                .then(() => {
                    GLOBAL.LoginPage.setLoginStatus();
                });
                return;
            }

            ToastAndroid.showWithGravity(
                response.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            let oldState = Object.assign({}, this.state);
            oldState.loading = false;
            this._promisedSetState(oldState);
          })
          .catch(err => console.log(err));
    }



    render(){
        return(
            <View style={styles.container} >
                <View>
                { this.state.loading ? <MyLoading /> : null }
                    <TextInput style={styles.inputBox} 
                        placeholderTextColor="#ffffff"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="email"
                        value={this.state.email}
                        onChangeText={email=> this.setState({email})} />

                    <TextInput style={styles.inputBox} 
                        placeholderTextColor="#ffffff"              
                        secureTextEntry={true}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="password" 
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        />
                </View>

                <TouchableOpacity style={styles.button}
                onPress={this.onBottomPress}>
                    <Text style={styles.loginbutton}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.errorText} >{this.state.error}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container : {
        justifyContent: 'center',
        alignItems: 'center',  
        margin:'3%'           
    },

   inputBox :{
       width :300,
       backgroundColor :'rgba(255, 255, 255, 0.3)',
       borderRadius :10,
       
       paddingHorizontal: 10,
       fontSize: 18,
       color: '#ffffff',
       marginVertical:10,
   },
   button:{
    justifyContent:'center',
    backgroundColor :'#004d66',
    borderRadius :10,
    paddingVertical:10,
    marginTop:20,
    marginBottom:30,  
    width :300,

   },

   loginbutton:{
        
        justifyContent:'center',
        textAlign:'center',       
        fontSize:16,
        fontWeight:'500',
        color: '#ffffff'
                
   },
   errorText:{
    fontSize:25,
    color:'red',
    alignSelf:'center',
    marginTop:10

},
   
    
})

