import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './pages/home';
import Cards from './pages/cards';
import Camera from './pages/camera';
import Settings from './pages/settings';
import Transactions from './pages/transactions';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState, AppStateStatus, BackHandler, TouchableHighlight, View } from 'react-native';
import { NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native';
import UserInactivity from 'react-native-user-detector-active-inactive';
import { useEffect, useState } from 'react';

type Props = {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
};

const HomeRoute = () => <Home />;
const CardsRoute = () => <Cards />;
const CameraRoute = () => <Camera />;
const TransactionsRoute = () => <Transactions />;
const SettingsRoute = () => <Settings />;

const Main = ({ route, navigation }: Props) => {
  const [index, setIndex] = React.useState(0);
  const indexParam = route.params && route.params.index !== undefined ? route.params.index : 0;

  useFocusEffect(React.useCallback(() => {
    setIndex(indexParam);
  }, [indexParam]))

  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'cards', title: 'Cards', focusedIcon: 'card-multiple', unfocusedIcon: 'card-multiple-outline' },
    { key: 'camera', title: 'QR' },
    { key: 'transactions', title: 'Transactions', focusedIcon: 'post', unfocusedIcon: 'post-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'account-wrench', unfocusedIcon: 'account-wrench-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    cards: CardsRoute,
    camera: CameraRoute,
    transactions: TransactionsRoute,
    settings: SettingsRoute,
  });

  const handleActiveInactive = () => {
    navigation.navigate('Login');
  };

  const [resetTimer, setResetTimer] = React.useState(0);

  React.useEffect(() => {
    setResetTimer(prev => prev + 1);
  }, [index]);

  const [appState, setAppState] = useState(AppState.currentState);

  React.useEffect(() => {
    const appInactiveHandler = () => {
      navigation.navigate('Login');
    };

    const handleAppStateChange = (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        appInactiveHandler();
      }
      setAppState(nextAppState);
    };

    const unsubscribe = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      unsubscribe.remove();
    };
  }, [appState, navigation]);

  const [currentScreen, setCurrentScreen] = React.useState('Main');

  const handleNavigation = (screenName: string) => {
    setCurrentScreen(screenName);
    navigation.navigate(screenName);
  };

  useFocusEffect(() => {
    setCurrentScreen(route.params?.name);
  })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, []);
  
  return (
    <UserInactivity
      key={resetTimer}
      currentScreen={currentScreen}
      timeForInactivity={60}
      skipKeyboard={true}
      // consoleTimer={true}
      // consoleTouchScreen={true}
      // consoleComponentChange={true}
      onHandleActiveInactive={handleActiveInactive}
      style={{ flex: 1 }}
    >
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: 'white'}}
        activeColor='#0e1c43'
        activeIndicatorStyle={{ backgroundColor: 'transparent', borderTopColor: '#0e1c43', borderTopWidth: 3, marginBottom: 23, borderRadius: 0 }}
      />
      <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' }}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={'white'}
          style={{
            borderRadius: 100,
            borderWidth: 5,
            borderColor: '#0e1c43',
            backgroundColor: 'white',
            padding: 15,
          }}
          onPress={() => handleNavigation('CameraQR')}
        >
          <Icon name='qr-code' size={20} color={'#0e1c43'} />
        </TouchableHighlight>
      </View>
    </UserInactivity>
  );
};

export default Main;