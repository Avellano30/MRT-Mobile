import React, { useState } from 'react';
import { withExpoSnack, styled } from 'nativewind';
import { Text, View, Button, Alert } from 'react-native';
import PasscodeInput from '../components/passcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);

const Pin = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const navigation = useNavigation();

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
    <StyledView className='flex flex-1 flex-col justify-center mx-auto'>
      <StyledText className="text-slate-800 font-bold text-center mb-5">Enter new 6-digit passcode</StyledText>
      <PasscodeInput value={pin} onChange={setPin} />
      <StyledText className="text-slate-800 font-bold mt-12 mb-5 text-center">Confirm new 6-digit passcode</StyledText>
      <PasscodeInput value={confirmPin} onChange={setConfirmPin} />
      <StyledView className='mt-12'>
        <Button title='Confirm' onPress={handleSavePin} />
      </StyledView>
    </StyledView>
  );
};

export default withExpoSnack(Pin);
