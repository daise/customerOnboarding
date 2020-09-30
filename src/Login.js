import React, {useState, useContext} from 'react';
import {StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {
  View,
  TextField,
  Colors,
  Spacings,
  Button,
  Text,
} from 'react-native-ui-lib';
import {AuthContext} from '../navigation/DrawerNavigator';
// import auth from '@react-native-firebase/auth';
import firebase from '../config/firebase';
import auth from '@react-native-firebase/auth';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useContext(AuthContext);
  console.log(authUser);
  const {setUserToken} = authUser;

  userLogin = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log('User logged-in successfully!');
          setIsLoading(false);
          setUserToken(email);
          navigation.navigate('Docs');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            setIsLoading(false);
            setUserToken(email);
            navigation.navigate('Docs');
          } else {
            console.log('error', error);
            setIsLoading(false);
            Alert.alert(error.message);
          }
        });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View useSafeArea style={{flex: 1, justifyContent: 'center'}}>
      <Text text50 row center color="#00BBF2" marginB-15>
        DigiLock Docs
      </Text>
      <TextField
        placeholder="Email/Phone"
        title="Email/Phone"
        text70
        containerStyle={styles.input}
        titleColor="#00BBF2"
        style={{
          backgroundColor: Colors.grey60,
          height: '100%',
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 20,
        }}
        value={email}
        onChangeText={(email) => setEmail(email)}
        hideUnderline
        enableErrors={false}
        titleStyle={{marginLeft: 10}}
      />
      <TextField
        placeholder="Password"
        title="Password"
        text70
        titleColor="#00BBF2"
        containerStyle={styles.input}
        secureTextEntry
        style={{
          backgroundColor: Colors.grey60,
          height: '100%',
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 20,
        }}
        value={password}
        onChangeText={(password) => setPassword(password)}
        hideUnderline
        enableErrors={false}
        titleStyle={{marginLeft: 10}}
      />
      <Button
        animateLayout
        fullWidth
        label="Login"
        onPress={() => userLogin()}
        marginB-10
      />
      <Button
        label="Signup for new Account"
        link
        style={{marginBottom: 20}}
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        label="Forgot Password"
        link
        style={{marginBottom: 20}}
        onPress={() => navigation.navigate('Forgot Password')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacings.s4,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
