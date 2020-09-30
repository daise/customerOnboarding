import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Alert, ActivityIndicator, Image} from 'react-native';
import {
  View,
  TextField,
  Colors,
  Spacings,
  Button,
  Text,
  TextArea,
} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import firebase from '../config/firebase';
import {AuthContext} from '../navigation/DrawerNavigator';

export default ({route, navigation}) => {
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authUser = useContext(AuthContext);
  console.log(authUser);
  const {userToken} = authUser;

  console.log(userToken, 'userToken');

  const {id} = route.params || {};

  useEffect(() => {
    if (id) {
      (async () => {
        await firestore()
          .collection('files')
          .doc(id)
          .get()
          .then((documentSnapshot) => {
            const docs = documentSnapshot.data();
            setDocumentType(docs.documentType);
            setDescription(docs.description);
            setUrl(docs.url);
            console.log(docs, 'get docs');
          })
          .catch((err) => console.log(err));
      })();
    }
  }, [id]);
  const uploadDocs = async () => {
    if (documentType === '' && description === '') {
      Alert.alert('Please enter Document Type and Description!');
    } else {
      setIsLoading(true);

      if (id) {
        firestore()
          .collection('files')
          .doc(id)
          .update({
            documentType,
            description,
            url,
            email: userToken,
          })
          .then(function () {
            Alert.alert('Document Details updated');
            setIsLoading(false);
            navigation.navigate('Docs');
          })
          .catch(function (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error ', error);
            setIsLoading(false);
          });
      } else {
        firestore()
          .collection('files')
          .add({
            documentType,
            description,
            url,
            email: userToken,
          })
          .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
            Alert.alert('Document Details uploaded');
            setIsLoading(false);
            navigation.navigate('Docs');
          })
          .catch(function (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error ', error);
            setIsLoading(false);
          });
      }
    }
  };

  const handlePicker = () => {
    // console.log('edit');

    ImagePicker.showImagePicker({}, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setIsLoading(true);
        // here we can call a API to upload image on server
        const reference = storage(firebase).ref(`docs/${response.fileName}`);
        await reference.putFile(response.path);
        const url = await storage(firebase)
          .ref(`docs/${response.fileName}`)
          .getDownloadURL();
        setUrl(url);
        url ? setIsLoading(false) : '';
      }
    });
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
        Upload Docs
      </Text>
      <TextField
        placeholder="Document Type"
        floatingPlaceholder
        title="Document Type"
        error={''}
        useTopErrors={false}
        maxLength={65}
        floatOnFocus
        value={documentType}
        onChangeText={(documentType) => setDocumentType(documentType)}
        titleColor="#00BBF2"
      />
      <TextField
        placeholder="Description"
        floatingPlaceholder
        title="Description"
        error={''}
        useTopErrors={false}
        maxLength={250}
        floatOnFocus
        value={description}
        onChangeText={(description) => setDescription(description)}
        titleColor="#00BBF2"
      />
      <Text style={{textAlign: 'center', flex: 1}}>
        {url && <Image marginB-10 style={styles.stretch} source={{uri: url}} />}
      </Text>

      <Button
        animateLayout
        fullWidth
        label="Select a document"
        onPress={() => handlePicker()}
        marginB-10
      />

      <Button
        animateLayout
        fullWidth
        label="Upload Docs"
        onPress={() => uploadDocs()}
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
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 250,
    height: 120,
    borderRadius: 7,
    top: 0,
  },
});
