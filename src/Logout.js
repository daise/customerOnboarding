import React, {useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  View,
  TextField,
  Colors,
  Spacings,
  Button,
  Text,
} from 'react-native-ui-lib';
import {AuthContext} from '../navigation/DrawerNavigator';
import auth from '@react-native-firebase/auth';

export default ({navigation}) => {
  const authUser = useContext(AuthContext) || {};
  console.log(authUser);
  const {userToken, setUserToken} = authUser;
  Alert.alert('You are logging Out.');
  setUserToken('');
  auth()
    .signOut()
    .then(() => {
      navigation.navigate('Login');
    })
    .catch((error) => console.log('error', error));

  return null;
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacings.s4,
  },
});
