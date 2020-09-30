import React from 'react';
import {StyleSheet} from 'react-native';
import {View, TextField, Colors, Spacings, Button, Text} from 'react-native-ui-lib';

export default ({ navigation }) => {
  state = {};

    return (

        <View useSafeArea style={{ flex: 1, justifyContent: 'center' }}>
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
              borderRadius: 20
            }}
            hideUnderline
            enableErrors={false}
            titleStyle={{marginLeft: 10}}
          />
          
          <Button animateLayout fullWidth label="Forgot Password" marginB-10 />
          <Button
            label="Login"
            link
            style={{marginBottom: 20}}
            onPress={() => navigation.navigate("Login")}
          />

            
        </View>

    );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacings.s4
  }
});

