import * as React from 'react';
import { useWindowDimensions} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import IAttend from './IAttend';
import Ewallet from './Ewallet';
import IDcard2 from './IDcard2';
import ProfileInfo from '../components/ProfileInfo';


const Drawer = createDrawerNavigator();


const IDCard=()=> {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  return (
    
    <Drawer.Navigator initialRouteName="IDcard2"
        drawerContentOptions={{

          activeTintColor: '#ccffb3',
          itemStyle: { marginVertical: 5 },
          labelStyle:{color:'#ffffff'}
        }}
        drawerStyle={{
        backgroundColor: '#1f2e2e',
      }}
      overlayColor="transparent">
      <Drawer.Screen name="IDcard" component={IDcard2} />
      <Drawer.Screen name="IAttend" component={IAttend} />
      <Drawer.Screen name="Ewallet" component={Ewallet} />
      <Drawer.Screen name="Profile" component={ProfileInfo} />
    </Drawer.Navigator>
    
  );
}
export default IDCard;