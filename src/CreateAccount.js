import React, {useState} from 'react';
import {StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {
  View,
  TextField,
  Colors,
  Spacings,
  Button,
  Text,
} from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';

export default ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: name,
            phone: phone,
          });
          console.log();
          setIsLoading(false);
          Alert.alert('User registered successfully!');
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
          Alert.alert(error.message);
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
    <View
      useSafeArea
      paddingH-20
      paddingT-40
      style={{flex: 1, justifyContent: 'center'}}>
      <Text text50 row center color="#00BBF2" marginB-15>
        Create Account
      </Text>
      <TextField
        placeholder="Name"
        floatingPlaceholder
        title="Name"
        error={''}
        useTopErrors={false}
        maxLength={65}
        floatOnFocus
        value={name}
        onChangeText={(name) => setName(name)}
        titleColor="#00BBF2"
      />
      <TextField
        placeholder="Email"
        floatingPlaceholder
        title="Email"
        error={''}
        useTopErrors={false}
        maxLength={65}
        floatOnFocus
        value={email}
        onChangeText={(email) => setEmail(email)}
        titleColor="#00BBF2"
      />

      <TextField
        placeholder="Phone"
        floatingPlaceholder
        title="Phone"
        error={''}
        useTopErrors={false}
        maxLength={65}
        floatOnFocus
        value={phone}
        onChangeText={(phone) => setPhone(phone)}
        titleColor="#00BBF2"
      />

      <TextField
        placeholder="Password"
        floatingPlaceholder
        title="Password"
        error={''}
        useTopErrors={false}
        maxLength={65}
        floatOnFocus
        value={password}
        onChangeText={(password) => setPassword(password)}
        titleColor="#00BBF2"
        secureTextEntry
      />
      <Button
        animateLayout
        fullWidth
        label="Create Account"
        onPress={() => registerUser()}
        marginB-10
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
