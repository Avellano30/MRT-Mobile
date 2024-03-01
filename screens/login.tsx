import React, { useEffect, useState } from 'react';
import { View, Alert, BackHandler, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PinCodeInput from 'react-native-smooth-pincode-input';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [pin, setPin] = useState('');

  if(pin.length === 6){
    const handleLogin = () => {
      try {
        const savedPin = storage.getString('pin');
        if (savedPin === pin) {
          // PIN matches, navigate to the main screen
          navigation.navigate('Main');
        } else {
          Alert.alert('Error', 'Invalid PIN');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to authenticate');
      }
    };
    
    handleLogin();
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Image source={require('../assets/logo.png')}
          style={{
            height: 250,
            width: 200,
            resizeMode: 'contain',
          }} />
      </View>
      
      <Text style={{ fontSize: 28, fontWeight: '900', color: 'black', textAlign: 'center' }}>Welcome!</Text>

      <Text style={{ textAlign: 'center', color: 'black', marginBottom: 50, marginTop: 10 }}>Enter your 6-digit passcode</Text>

      <View style={{ alignItems: 'center' }}>
        <PinCodeInput
          value={pin}
          onTextChange={setPin}
          codeLength={6}
          cellSize={45}
          cellSpacing={10}
          cellStyle={{ borderWidth: 0, borderRadius: 6, borderColor: '#f0f0f0', backgroundColor: '#f0f0f0' }}
          cellStyleFocused={{ borderColor: '#d0d0d0', borderTopWidth: 1, borderBottomWidth: 1 }}
          textStyle={{ fontSize: 30, fontWeight: 'bold', color: '#0e1c43' }}
          color='black'
          secureTextEntry={true}
          animated={false}
          password
          mask="•"
          maskDelay={500}
          restrictToNumbers={true}
        />
      </View>
    </SafeAreaView>
  );
}

export default Login;
