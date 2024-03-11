import React, { useState } from 'react';
import { withExpoSnack, styled } from 'nativewind';
import { View, Alert, BackHandler, AppStateStatus, AppState } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import PinCodeInput from 'react-native-smooth-pincode-input';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { storage } from '../../../login';

const Pin = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const _goBack = () => navigation.goBack();

  const handleSavePin = () => {
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    try {
      storage.set('pin', pin);
      Alert.alert('Success', 'PIN saved successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to save PIN');
    }
  };

  useFocusEffect(() => {
    // Subscribe to app state changes
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      navigation.navigate('Login');
      if (nextAppState === 'background') {
        // Close the app when it goes into the background
        BackHandler.exitApp();
      }
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Clean up function to remove event listener
    return () => {
      // Remove the event listener subscription
      subscription.remove();
    };
  });
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
