import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';


const Home = () => {
  const navigation = useNavigation();

  const _handleCamera = () => navigation.navigate('CameraQR' as never);

  useFocusEffect(() => {
    navigation.navigate('Main' as never);
  })
  return (
    <>
      <Icon name="home" size={30}/>
      <Text>Home12</Text>
      <Button onPress={_handleCamera} style={{ backgroundColor: 'black'}} textColor='white'>Go to camera</Button>
    </>

  );
};

export default Home;