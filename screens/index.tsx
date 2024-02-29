import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home';
import Cards from './cards';
import Camera from './camera';


const HomeRoute = () => <Home />;
const CardsRoute = () => <Cards />;
const CameraRoute = () => <Camera />;
const TransactionsRoute = () => <Text>Transactions</Text>;
const SettingsRoute = () => <Text>Settings</Text>;

const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'cards', title: 'Cards', focusedIcon: 'card-multiple', unfocusedIcon: 'card-multiple-outline' },
    { key: 'camera', title: 'Camera'},
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

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: 'white' }}
      activeColor='#0e1c43'
      // inactiveColor='white'
    />
  );
};

export default Main;