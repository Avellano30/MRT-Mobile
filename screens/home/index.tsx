import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './pages/home';
import Cards from './pages/cards';
import Camera from './pages/camera';
import Settings from './pages/settings';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight, View } from 'react-native';


const HomeRoute = () => <Home />;
const CardsRoute = () => <Cards />;
const CameraRoute = () => <Camera />;
const TransactionsRoute = () => <Text>Transactions</Text>;
const SettingsRoute = () => <Settings />;

const Main = () => {
  const [index, setIndex] = React.useState(0);
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

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: 'white' }}
        activeColor='#0e1c43'
        activeIndicatorStyle={{ backgroundColor: 'transparent' }}
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
          onPress={() => setIndex(2)}
        >
          <Icon name='qr-code' size={20} color={'#0e1c43'} />
        </TouchableHighlight>
      </View>

    </>
  );
};

export default Main;