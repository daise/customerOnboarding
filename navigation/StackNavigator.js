import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from '../src/Login';
import CreateAccount from '../src/CreateAccount';
import ForgotPassword from '../src/ForgotPassword';
import Chat from '../src/Chat';
import DocList from '../src/DocList';
import UploadDocs from '../src/UploadDocs';
import Logout from '../src/Logout';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#00BBF2',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="SignUp" component={CreateAccount} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const DocsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="ios-menu"
            size={25}
            color="#FFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Docs" component={DocList} />
      <Stack.Screen name="Details" component={DocList} />
    </Stack.Navigator>
  );
};

const UploadDocsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="ios-menu"
            size={25}
            color="#FFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Upload Docs" component={UploadDocs} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="ios-menu"
            size={25}
            color="#FFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  DocsStackNavigator,
  UploadDocsStackNavigator,
  ContactStackNavigator,
};
