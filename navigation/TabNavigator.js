import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {DocsStackNavigator, UploadDocsStackNavigator} from './StackNavigator';
import {AuthContext} from './DrawerNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const authUser = useContext(AuthContext);
  console.log(authUser);
  const {userToken} = authUser;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Docs') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'Upload Docs') {
            iconName = focused ? 'ios-cloud-upload' : 'ios-cloud-upload';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0087be',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 15,
          margin: 0,
          padding: 0,
        },
      }}>
      <Tab.Screen
        name="Docs"
        component={DocsStackNavigator}
        options={{
          tabBarVisible: userToken ? true : false,
        }}
      />
      <Tab.Screen name="Upload Docs" component={UploadDocsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
