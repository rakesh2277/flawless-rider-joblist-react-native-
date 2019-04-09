import React from 'react'
import { AppRegistry, Text } from 'react-native';
import { Provider } from 'react-redux'
import { name as appName } from './app.json';
import App from './App';
import appStore from './src/store/appStore'

const store = appStore()

const ReduxApp = () => (
    <Provider store={store}>
        <App />
        {/* <Text>AA</Text> */}
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);