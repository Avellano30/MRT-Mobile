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

    if (text.length === 0 && index > 0) {
      refs[index - 1].current?.focus();
    } else if (text.length > 0 && index < 5) {
      refs[index + 1].current?.focus();
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
    borderWidth: 1,
    borderColor: '#333',
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
  },
});

export default PasscodeInput;
