import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import IAttend from '../pages/IAttend';
import Ewallet from '../pages/Ewallet';
import IDcard2 from '../pages/IDcard2';
import Pay from './Pay';
import Reload from './Reload';
import Transfer from './Transfer';
import Receive from './Receive';


const Tab = createMaterialTopTabNavigator();

const Give=()=> {
  return (
    
      <Tab.Navigator initialRouteName='IDCard'
            tabBarOptions={{
            activeTintColor: '#ffffff',
            labelStyle: {  fontWeight: 'bold' },
            
            style: { backgroundColor: '#004d38', },
          }}>
        <Tab.Screen name="Transfer" component={Transfer} />
        <Tab.Screen name="Receive" component={Receive} />
    
      </Tab.Navigator>
    
  );
}
export default Give;