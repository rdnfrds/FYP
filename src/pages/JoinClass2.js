import React, { Component } from 'react';
import { TextInput, View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import Alertbutton2 from '../class pages/alertbutton2';

export default class JoinClass2 extends Component{
    componentDidMount() {
        loc(this);
      }
      
      componentWillUnMount() {
        rol();
      }
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            city: null,
            sem: []
        };
    }
    changeCountry(item) {
        let city = null;
        let sem;
        switch (item.value) {
            case 'fr':
                sem = [
                    {label: 'semester 1', value: 'sem1'},
                    {label: 'semester 2', value: 'sem2'},
                    {label: 'semester 3', value: 'sem3'}
                ];
            break;
            case 'es':
                sem = [
                    {label: 'semester 1', value: 'sem1'},
                    {label: 'semester 2', value: 'sem2'},
                    {label: 'semester 3', value: 'sem3'}
                ];
            break;
        }

        this.setState({
            city,
            sem
        });
    }

    changeCity(item) {
        this.setState({
            city: item.value
        });
    }

    render(){
        return(
            
            <View style={styles.classtext}>
            <Text style=
                {{fontSize:25, fontWeight:'300', marginTop:10, color:'#666666'}}>
                    Join Class
            </Text>

            <>
                <DropDownPicker
                    items={[
                        {label: '2018/2019', value: 'es'},
                        {label: '2019/2020', value: 'fr'},
                        {label: '2020/2021', value: 'es'},
                    ]}
                    defaultNull
                    placeholder="Select Year"
                    containerStyle={{marginVertical:8,height:hp('9%'), width:wp('90%')}}
                    onChangeItem={item => this.changeCountry(item)}
                />
                <DropDownPicker
                    items={this.state.sem}
                    defaultNull={this.state.city === null}
                    placeholder="Select Semester"
                    containerStyle={{marginVertical:8,height:hp('9%'), width:wp('90%')}}
                    onChangeItem={item => this.changeCity(item)}
                />
            </>
            <TextInput style={{borderBottomWidth:0.4, width:wp('90%'), paddingHorizontal:10 }} 
                placeholderTextColor="#595959"              
                
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="class code" 
                color='black'
                
                />
            <Alertbutton2/>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
    classtext:{
        
        justifyContent: 'center',
        alignItems: 'center',
    },
})