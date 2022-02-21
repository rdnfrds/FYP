import React from 'react';
import {
  StyleSheet,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import IDCard from './src/pages/IDCard';
import IDcard2 from './src/pages/IDcard2';
import Login from './src/pages/Login.js';
import Form from './src/pages/Form';
import IAttend from './src/pages/IAttend';
import Ewallet from './src/pages/Ewallet';
import LoginPage from './src/pages/LoginPage';
import Loading from './src/pages/Loading';
import MyClass from './src/pages/MyClass';
import CreateClass from './src/pages/CreateClass';
import JoinClass from './src/pages/JoinClass';
import info4993 from './src/class pages/info4993';
import Chapter from './src/class pages/chapter';
import Student from './src/class pages/student';
import Record from './src/class pages/record';
import Qrscanner from './src/components/qrscanner';
import Myclasslist from './src/student/Myclasslist';
import Studentlist from './src/student/Studentlist';
import StudentAttend from './src/student/StudentAttend';
import CreateClass2 from './src/pages/CreateClass2';
import JoinClass2 from './src/pages/JoinClass2';
import SplashS from './src/components/SplashS';
import LogoProfile from './src/student/LogoProfile';

import Pay from './src/wallet/Pay';
import Reload from './src/wallet/Reload';
import Give from './src/wallet/Give';
import Transfer from './src/wallet/Transfer';
import Reload1 from './src/wallet/Reload1';
import StudentView from './src/student/StudentView';

const Stack = createStackNavigator();


const App: () => React$Node = () => {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="SplashS" headerMode="none" screenOptions={{
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: '#00b359' },
  }}>
  <Stack.Screen name="SplashS" component={SplashS} />
  <Stack.Screen name="LoginPage" component={LoginPage} />
  <Stack.Screen name="Login" component={Login}  />
  <Stack.Screen name="Form" component={Form} />
  <Stack.Screen name="Loading" component={Loading} />
  <Stack.Screen name="IDCard" component={IDCard} />
  <Stack.Screen name="IDcard2" component={IDcard2} />
  <Stack.Screen name="IAttend" component={IAttend} />
  <Stack.Screen name="Ewallet" component={Ewallet} />
  <Stack.Screen name="MyClass" component={MyClass} />
  <Stack.Screen name="CreateClass" component={CreateClass} />
  <Stack.Screen name="JoinClass" component={JoinClass} />
  <Stack.Screen name="info4993" component={info4993} />
  <Stack.Screen name="Chapter" component={Chapter} />
  <Stack.Screen name="Student" component={Student} />
  <Stack.Screen name="Record" component={Record} />
  <Stack.Screen name="Qrscanner" component={Qrscanner} />
  <Stack.Screen name="Myclasslist" component={Myclasslist} />
  <Stack.Screen name="Studentlist" component={Studentlist} />
  <Stack.Screen name="StudentAttend" component={StudentAttend} />
  <Stack.Screen name="CreateClass2" component={CreateClass2} />
  <Stack.Screen name="JoinClass2" component={JoinClass2} />
  <Stack.Screen name="LogoProfile" component={LogoProfile} />
  <Stack.Screen name="Pay" component={Pay} />
  <Stack.Screen name="Reload" component={Reload} />
  <Stack.Screen name="Give" component={Give} />
  <Stack.Screen name="Transfer" component={Transfer} />
  <Stack.Screen name="Reload1" component={Reload1} />
  <Stack.Screen name="StudentView" component={StudentView} />
</Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor :'#455a64',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  headercontent:{
    justifyContent:'center',

  }
});

export default App;
