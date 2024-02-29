import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PinCodeInput from 'react-native-smooth-pincode-input';

const Login = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      if (savedPin === pin) {
        // PIN matches, navigate to the main screen
        navigation.navigate('Home' as never);
      } else {
        Alert.alert('Error', 'Invalid PIN');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to authenticate');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: '900', color: 'black', textAlign: 'center' }}>Welcome back!</Text>

      <Text style={{ textAlign: 'center', color: 'black', marginBottom: 50, marginTop: 10 }}>Enter new 6-digit passcode</Text>

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

      {pin.length === 6 && (
        <Button onPress={handleLogin} style={{ borderRadius: 10, marginTop: 50, marginHorizontal: 40 }} buttonColor='#0e1c43' textColor='white'>Confirm</Button>
      )}
    </SafeAreaView>
  );
}

export default Login;
