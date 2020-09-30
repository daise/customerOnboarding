import firebase from '@react-native-firebase/app';

// Your secondary Firebase project credentials...
const credentials = {
  clientId: 'XXXXXXXXX',
  apiKey: 'XXXXXX',
  authDomain: 'XXXXXXXXXXXXXXXXXXXX',
  databaseURL: 'XXXXXXXX',
  projectId: 'XXXXXXXX',
  storageBucket: 'XXXXXXXX',
  messagingSenderId: 'XXXXXXX',
  appId: 'XXXXXXXXX',
  measurementId: 'XXXXXX',
};
export default !firebase.apps.length
  ? firebase.initializeApp(credentials)
  : firebase.app();
