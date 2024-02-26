import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home';
import Cards from './cards';


const HomeRoute = () => <Home/>;
const CardsRoute = () => <Cards/>;
const TransactionsRoute = () => <Text>Transactions</Text>;
const SettingsRoute = () => <Text>Settings</Text>;

const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'cards', title: 'Cards', focusedIcon: 'card-multiple', unfocusedIcon: 'card-multiple-outline'},
    { key: 'transactions', title: 'Transactions', focusedIcon: 'post', unfocusedIcon: 'post-outline'},
    { key: 'settings', title: 'Settings', focusedIcon: 'account-wrench', unfocusedIcon: 'account-wrench-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    cards: CardsRoute,
    transactions: TransactionsRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;