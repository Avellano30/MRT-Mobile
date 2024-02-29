import React, { useState } from 'react';
import { withExpoSnack, styled } from 'nativewind';
import { View, Alert } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import PasscodeInput from '../components/passcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import PinCodeInput from 'react-native-smooth-pincode-input';

const Pin = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const navigation = useNavigation();

  const _goBack = () => navigation.goBack();

  const handleSavePin = async () => {
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    try {
      await AsyncStorage.setItem('pin', pin);
      Alert.alert('Success', 'PIN saved successfully');
      navigation.navigate('Login' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to save PIN');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Appbar.Header mode='center-aligned' style={{ backgroundColor: 'white', height: 50 }} statusBarHeight={0}>
        <Appbar.Action icon={() => <Icon name="chevron-back" size={23} color="black" />} onPress={_goBack} />
      </Appbar.Header>

      <View style={{ marginBottom: 15 }} />

      <Text style={{ fontSize: 28, fontWeight: '600', color: 'black', textAlign: 'center' }}>Enter your New PIN</Text>

      <Text style={{ textAlign: 'center', color: 'black', marginBottom: 20, marginTop: 5 }}>Enter new 6-digit passcode</Text>
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


      <Text style={{ textAlign: 'center', color: 'black', marginBottom: 20, marginTop: 50 }}>Confirm new 6-digit passcode</Text>
      <View style={{ alignItems: 'center' }}>
        <PinCodeInput
          value={confirmPin}
          onTextChange={setConfirmPin}
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

      {pin.length === 6 && confirmPin.length === 6 && (
        <Button onPress={handleSavePin} style={{ borderRadius: 10, marginTop: 50, marginHorizontal: 40 }} buttonColor='#0e1c43' textColor='white'>Confirm</Button>
      )}
    </SafeAreaView>
  );
};

export default Pin;
