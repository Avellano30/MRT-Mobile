import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface PasscodeInputProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const PasscodeInput: React.FC<PasscodeInputProps> = ({ value, onChange }) => {
  const [passcode, setPasscode] = useState(['', '', '', '', '', '']);
  const refs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const handleChangeText = (text: string, index: number) => {
    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);

    if (text.length > 0 && index < 6) {
      if (index === 5 || newPasscode[index + 1] !== '') {
        // If the current box is the last box or the next box is already filled, focus remains on the current box
        refs[index].current?.focus();
      } else {
        // Move focus to the next box
        refs[index + 1].current?.focus();
      }
    } else if (text.length === 0 && index > 0) {
      // If the current box is empty, move focus to the previous box
      refs[index - 1].current?.focus();
    }

    // Combine the passcode array into a single string and update the parent component
    onChange(newPasscode.join(''));
  };

  return (
    <View style={styles.container}>
      {passcode.map((value, index) => (
        <TextInput
          key={index}
          textContentType='password'
          style={styles.box}
          value={value}
          onChangeText={(text) => {
            // Only allow numeric characters
            if (/^[0-9]*$/.test(text)) {
              handleChangeText(text, index);
            }
          }}
          maxLength={1}
          keyboardType="numeric"
          secureTextEntry
          selectTextOnFocus
          ref={refs[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: '#f0f0f0',
    width: 45,
    height: 45,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default PasscodeInput;
