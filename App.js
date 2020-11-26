import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/mainScreen';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import mainReducer from './src/store/reducers/main';

const Stack = createStackNavigator();
const store = createStore(mainReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerTitle: 'AVAILABILITIES',
            headerTitleStyle: {
              textAlign: 'center',
              color: 'white',
              fontSize: 12,
            },
            headerStyle: {
              backgroundColor: '#f68862',
            },
          }}>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{title: 'Welcome'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
