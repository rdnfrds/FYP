import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, TouchableOpacity,View,Text, StyleSheet, ToastAndroid } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GLOBAL from '../global/global';
import { validateCurrency } from '../global/helper';
import MyLoading from '../global/MyLoading';




function Reload ({navigation}){
    const [amount, setAmount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const reloadBalance = () => {

        // validate amount
        if (!validateCurrency(amount)) {
            ToastAndroid.showWithGravity(
                'Error! Please Enter a valid amount.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            return;
        }

        if (amount < 10) {
            ToastAndroid.showWithGravity(
                'Error! Minimum reload amount is 10',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            return;
        }

        setLoading(true);
        fetch('https://fypproject.greenpixi.com/api/reload', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + GLOBAL.AUTH.token
            },
            body: JSON.stringify({
                "amount": amount,
            })
        })
            .then(response => response.json())
            .then(response => {
            // if success naviagte to success screen
            setLoading(false);
            if (response.error === false) {
                return navigation.navigate('Reload1');
            }
            ToastAndroid.showWithGravity(
                response.message,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            console.log(response);
        });
    }

    return (
    <LinearGradient colors={['#004d37','#00996e', '#4dffcc',]} style={styles.linearGradient}>
        { loading ? <MyLoading /> : null }
        <View>
            <TextInput style={styles.inputBox} 
                placeholderTextColor="#595959"            
                underlineColorAndroid='rgba(0,0,0,0)'
                keyboardType = 'numeric'
                placeholder="Enter your preferred amount"
                color='black'
                number={amount}
                onChangeText={text => setAmount(text)}
            />

            <Text style={{fontSize: 14,marginLeft:40}}> Min reload amount is RM10</Text>
            <TouchableOpacity  onPress={() => reloadBalance()}>
                <Text style={styles.textedit}>Reload Ewallet</Text>
            </TouchableOpacity>
            
        </View>
    </LinearGradient>
      )}
  

  


export default Reload;



const styles = StyleSheet.create({
    inputBox :{
        width :wp('80%'),
       borderWidth:2.5,
       borderColor:"gold",
       backgroundColor:'white',
       borderRadius:20,
        alignSelf:"center",
        paddingHorizontal: 12,
        fontSize: 18,
        // color: 'white',
        marginTop:50,
    },
    classtext:{
        
        justifyContent: 'center',
        alignItems: 'center',
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
       
      },

    textedit:{ 
        borderColor:'gold',
        textAlign:"center",
        borderWidth:2.5,
        borderRadius:20,
        backgroundColor:"white",
        width:wp('40%'),
        alignSelf:"center",
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:15,
        marginHorizontal:15, 
        fontWeight:'900',
        color:'black', fontSize:20
    
      },
})