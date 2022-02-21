import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
  Linking, Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class Qrscanner extends Component{

  constructor(props){
    super();
    this.props = props;
  }

  IfScaned = e =>{
    if(this.props.route.params.screenName === 'Pay') {
      this.props.navigation.navigate('Pay', {'account_no':e.data});
      return;
    }
    this.props.navigation.navigate('Transfer', {'account_no':e.data});
  }

  render(){
    return(
      <QRCodeScanner
        containerStyle={{backgroundColor:'#FFF', }}
        onRead={this.IfScaned}
        reactivate={true}
        permissionDialogMessage="need permission to access camera"
        reactivateTimeout={10}
        showMarker={true}
        markerStyle={{borderColor:'#ffffff', borderRadius:10}}
        vibrate={false}
        bottomContent={
          <TouchableOpacity>
            <Text style={{fontSize:21,color:'black', marginTop:30}}>Scan QR code</Text>
          </TouchableOpacity>
        }/>
    )

  }
}