import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewStart from './screens';
import CreatePin from './screens/createPin';
import Login from './screens/login';
import Main from './screens/home/index';
import Home from './screens/home';
import Cards from './screens/home/pages/cards';
import CameraQR from './screens/home/pages/camera';
import Settings from './screens/home/pages/settings';
import Transactions from './screens/home/pages/transactions';
import AddCard from './screens/home/pages/subpages/addCard';
import ResetPin from './screens/home/pages/subpages/resetPin';
import ScanOutput from './screens/home/pages/subpages/scanOutput';
import ViewTransaction from './screens/home/pages/subpages/viewTransaction';
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={storage.getString('pin') === undefined ? 'NewStart' : 'Login'}>
        
        {/* New Installed App */}
        <Stack.Screen name="NewStart" component={NewStart} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePin" component={CreatePin} options={{ headerShown: false }} />

        {/* Start Page */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />

        {/* Main Page  */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Cards" component={Cards} options={{ headerShown: false }} />
        <Stack.Screen name="CameraQR" component={CameraQR} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Transactions" component={Transactions} options={{ headerShown: false }} />

        {/* Sub Page */}
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPin" component={ResetPin} options={{ headerShown: false }} />
        <Stack.Screen name="ScanOutput" component={ScanOutput} options={{ headerShown: false }} />
        <Stack.Screen name="ViewTransaction" component={ViewTransaction} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;