import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {
  View,
  TextField,
  Colors,
  Spacings,
  Button,
  Text,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/DrawerNavigator';

export default ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [docs, setDocs] = useState([]); // Initial empty array of users

  const authUser = useContext(AuthContext);
  console.log(authUser);
  const {userToken} = authUser;
  useEffect(() => {
    const subscriber = firestore()
      .collection('files')
      .where('email', '==', userToken)
      .onSnapshot((querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((documentSnapshot) => {
          docs.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log(docs);
        setDocs(docs);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const deleteDocs = (docId) => {
    docId
      ? firestore()
          .collection('files')
          .doc(docId)
          .delete()
          .then(() => {
            console.log('User deleted!');
            Alert.alert('Document is deleted successfully');
          })
      : '';
  };

  return (
    <View useSafeArea style={{flex: 1, justifyContent: 'center'}}>
      <Text text50 row center color="#00BBF2" marginB-15>
        Document List
      </Text>
      <FlatList
        data={docs}
        renderItem={({item}) => (
          <View
            style={{
              height: '100%',
              flex: 1,
              margin: 5,
              flexDirection: 'row',
            }}>
            <Image style={styles.stretch} source={{uri: item.url}} />
            <View
              style={{
                height: '100%',
                flex: 1,
                margin: 5,
                alignItems: 'flex-start',
                flexGrow: 5,
              }}>
              <Text color="#0087be" marginB-15 text70>
                Document Name: {item.documentType}
              </Text>
              <Text color="#0087be" marginB-15 text70>
                Description: {item.description}
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                flex: 1,
                alignItems: 'flex-start',
                padding: 20,
              }}>
              <Icon
                name="create-outline"
                onPress={() =>
                  navigation.navigate('Upload Docs', {
                    screen: 'Upload Docs',
                    params: {id: item.key},
                  })
                }
                size={30}
                color="#0087be"
              />
              <Icon
                name="trash-outline"
                onPress={() => deleteDocs(item.key)}
                size={30}
                color="#0087be"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacings.s4,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 7,
    marginRight: 10,
  },
});
