/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/TabNavigator';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Provider} from 'react-redux';
import store from './src/store';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <TabNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
