import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import GLOBAL from '../global/global.js';
import MyLoading from '../global/MyLoading';
import { validateCurrency } from '../global/helper';


function Transfer ({route, navigation}){
  const [amount, setAmount] = React.useState(0);
  const [des, setDes] = React.useState('');
  const [loading, setLoading] = React.useState(false);



  const _transfer = () => {
    //  validate amount
    if (!validateCurrency(amount)) {
      ToastAndroid.showWithGravity(
        'Error! Please Enter a valid amount.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    } 

    setLoading(true);
    
    // send to server
    fetch('https://fypproject.greenpixi.com/api/transfer', {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+GLOBAL.AUTH.token
      },
      body: JSON.stringify({
        "to_account_no": route.params.account_no,
        "amount": amount,
        "user_description": des,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      route.params = null;
      setLoading(false);
      ToastAndroid.showWithGravity(
        response.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    );
    });
  }

    
    return(
    
      <LinearGradient colors={['#004d37','#00996e', '#4dffcc',]} style={styles.linearGradient}>
          
      <View>
        {/* <TextInput
          style={{ height: 50, width:300,alignSelf:"center", borderColor: 'gray', borderWidth: 1 }}
          onChangeT
          ext={text => onChangeText(text)}
          /> */}
          { loading ? <MyLoading /> : null }

            <TextInput style={styles.inputBox} 
              placeholderTextColor="#595959"            
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType = 'numeric'
              placeholder="Insert amount"
              color='#595959'
              number={amount}
              onChangeText={text => setAmount(text)}
              />

              <TextInput style={styles.inputBox2} 
                placeholderTextColor="#595959"            
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="What is it for?"
                color='#595959'
                onChangeText={text => setDes(text)}
              />

              <TouchableOpacity 
                onPress={() => navigation.navigate('Qrscanner')}>
              <Text style={styles.textedit}>Scan Here</Text>
            </TouchableOpacity>

            {
              route.params ? 
              <View>
                <Text style={{color:'#fff', textAlign:'center', marginTop:25, marginBottom:10}}>Scan complete.</Text>
                <TouchableOpacity 
                  onPress={() => _transfer()}>
                <Text style={styles.textedit}>Transfer Now</Text>
                </TouchableOpacity>
              </View>
              : null
            }


      </View>
      </LinearGradient>
    )
  
}

export default Transfer;

const styles = StyleSheet.create({
    classtext:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    container:{
        flexDirection:'row',

    },
    container2:{
       alignItems:'center',
        borderWidth:1,
        borderRadius:5,
         borderColor:"black",
          height:hp('30%'), width:wp('95%'),
          marginVertical:25,
          
         
          

    },
    textedit:{ 
        borderColor:'gold',
        textAlign:"center",
        borderWidth:2.5,
        alignSelf:"center",
        borderRadius:20,
        backgroundColor:"white",
        width:wp('40%'),
        paddingHorizontal:5,
        paddingVertical:4,
        marginVertical:5,
        marginHorizontal:8, 
        fontWeight:'900',
        color:'black', fontSize:20
    
      },
      linearGradient:{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
       
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      inputBox :{
            width :wp('80%'),
            marginTop:50,
            borderWidth:2.5,
            borderRadius:20,
            borderColor:"gold",
            backgroundColor:'#fff',
            alignSelf:"center",
            paddingHorizontal: 10,
            fontSize: 15,
            marginVertical:8,
        },
        inputBox2 :{
          width :wp('80%'),
          marginTop:2,
          borderWidth:2.5,
          borderRadius:20,
          backgroundColor:'white',
          borderColor:"gold",
          alignSelf:"center",
          paddingHorizontal: 10,
          fontSize: 15,
          color: '#ffffff',
          marginVertical:8,
      }

    
});