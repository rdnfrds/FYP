import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker'
import GLOBAL from '../global/global.js';
import MyLoading from '../global/MyLoading';
import { validateCurrency } from '../global/helper';


const _createFormData = (photo) => {
  const data = new FormData();
  data.append('image', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  return data;
};

export default class Pay extends React.Component {

  constructor(props) {
    super();
    this.state = {
      amount: 0,
      loading: false,
      photo: null,
      qrcode: null
    };
    this.props = props;
  }

  _promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve();
      });
    });
  }

  _handleUploadPhoto = () => {
    this._promisedSetState({loading: true}).then(() => {
      console.log("uploading....", this.state);
      fetch("https://fypproject.greenpixi.com/api/qrdecode", {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + GLOBAL.AUTH.token
        },
        body: _createFormData(this.state.photo)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({loading:false, 'photo':null, 'qrcode':response.qrcode});
      })
      .catch(error => {
        console.log("upload error", error);
      });
    })

  };


  _handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this._promisedSetState({ 'photo': response })
        .then(() => {
          this._handleUploadPhoto();
        })
      }
    })
  }


  _makeRequest(account_no) {
    // send to server
    console.log('---------makeRequest--------');
    this.setState({loading : true});
    fetch('https://fypproject.greenpixi.com/api/transfer', {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GLOBAL.AUTH.token
      },
      'body': JSON.stringify({
        "to_account_no": account_no,
        "amount": this.state.amount,
        "is_pay": 'YES',
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (this.props.route.params) {
        this.props.route.params = null
      }
      this.setState({loading : false, 'qrcode': null, amount: 0});
      ToastAndroid.showWithGravity(
        response.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    );
    });
  }

  _pay = () => {
    //  validate amount
    if (!validateCurrency(this.state.amount)) {
      ToastAndroid.showWithGravity(
        'Error! Please Enter a valid amount.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }

    try {
      let account_no = this.props.route.params.account_no;
      this._makeRequest(account_no);
    } catch (error) {
      this._makeRequest(this.state.qrcode);
    }

  }

      render() {
        return(
          <LinearGradient colors={['#004d37','#00996e', '#4dffcc',]} style={styles.linearGradient}>
            { this.state.loading ? <MyLoading /> : null } 
              <View>
                        
                  <Text style={{ alignSelf:"center",paddingTop: 40}}>Scan barcode or QR code</Text>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Qrscanner', {'screenName':'Pay'})}>
                      <Text style={styles.textedit2}>SCAN</Text>
                  </TouchableOpacity>

                  

                  <TouchableOpacity  onPress={() => this._handleChoosePhoto()}>
                      <Text style={styles.textedit}>SCAN FROM GALLERY</Text>
                  </TouchableOpacity>
                  { this.state.qrcode ? <Text style={{textAlign:'center',color:'#fff'}}>Scan from gallery completed.</Text> : null }

                  {
                    this.props.route.params ? 
                    <View>
                      <Text style={{color:'#fff', textAlign:'center', marginTop:25, marginBottom:10}}>Scan complete.</Text>
                    </View>
                    : null
                  }
      
                  
                  <TextInput style={styles.inputBox} 
                    placeholderTextColor="#595959"            
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType = 'numeric'
                    placeholder="Insert amount"
                    color='#595959'
                    number={this.state.amount}
                    onChangeText={text => this.setState({ 'amount':text })}
                    />
      

                  {
                    (this.props.route.params || this.state.qrcode) ? 
                    <View>
                      <TouchableOpacity 
                        onPress={() => this._pay()}>
                      <Text style={styles.textedit}>Pay Now</Text>
                      </TouchableOpacity>
                    </View>
                    : null
                  }
      
              </View>
          </LinearGradient>
          )
      }

  
}


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
  
        alignSelf:"center",
        borderWidth:2.5,
        borderRadius:20,
        backgroundColor:"white",
        width:wp('80%'),
        paddingHorizontal:5,
        paddingVertical:4,
        marginVertical:5,
        marginHorizontal:8, 
        fontWeight:'900',
        color:'black', 
        fontSize:18
      },
      linearGradient:{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
      },
      textedit2:{ 
        borderColor:'gold',
        textAlign:"center",
        marginTop:50,
        alignSelf:"center",
        borderWidth:2.5,
        borderRadius:20,
        backgroundColor:"white",
        width:wp('80%'),
        paddingHorizontal:5,
        paddingVertical:4,
        marginVertical:5,
        marginHorizontal:8, 
        fontWeight:'900',
        color:'black', 
        fontSize:18
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
});