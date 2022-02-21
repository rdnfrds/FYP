import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Chapter from './chapter';
import Student from './student';
import Record from './record';

const Tab = createBottomTabNavigator();

const info4993=()=> {
    return (
      
        <Tab.Navigator initialRouteName='Chapter'
            
            tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor:'#b3b3b3',
            labelStyle: {  fontWeight: 'bold' },          
            style: { backgroundColor: '#199591' },
          }}>
            <Tab.Screen name="Date" component={Chapter}                
              options={{
              tabBarLabel: 'Date',
              tabBarIcon: ({ color }) => (
             <Icon name="reader" color={color} size={20} />
                ),}}     
            />
            <Tab.Screen name="Student" component={Student} 
                options={{
              tabBarLabel: 'Student',
              tabBarIcon: ({ color, size }) => (
             <Icon name="man" color={color} size={20} />),}}
            />
            <Tab.Screen name="Record" component={Record} 
                options={{
              tabBarLabel: 'Record',
              tabBarIcon: ({ color, size }) => (
             <Icon name="radio-button-on" color={color} size={20} />),}}
            />
        </Tab.Navigator>
        
    )
}
export default info4993;