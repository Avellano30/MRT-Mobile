import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { BackHandler, Image, View } from 'react-native';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';


const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const _handleCamera = () => navigation.navigate('CameraQR');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, []);
  
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#edf3ff', alignItems: 'center', justifyContent: 'center' }}>
      
      <Text style={{ fontSize: 28, fontWeight: '900', color: 'black', textAlign: 'center' }}>Welcome back!</Text>

    </SafeAreaView>
    </>

  );
};

export default Home;