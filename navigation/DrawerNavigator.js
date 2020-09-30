import React, {useState, createContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ContactStackNavigator, MainStackNavigator} from './StackNavigator';
import TabNavigator from './TabNavigator';
import Logout from '../src/Logout';

const Drawer = createDrawerNavigator();

export const AuthContext = createContext();

const DrawerNavigator = () => {
  const [userToken, setUserToken] = useState('');
  console.log(userToken);

  return (
    <AuthContext.Provider value={{userToken, setUserToken}}>
      <Drawer.Navigator initialRouteName="Login">
        {userToken === '' ? (
          <Drawer.Screen name="Login" component={MainStackNavigator} />
        ) : (
          <>
            <Drawer.Screen name="Chat" component={ContactStackNavigator} />
            <Drawer.Screen name="Docs" component={TabNavigator} />
            <Drawer.Screen name="Logout" component={MainStackNavigator} />
          </>
        )}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
};

export default DrawerNavigator;
