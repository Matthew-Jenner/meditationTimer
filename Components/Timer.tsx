import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

interface TimerProps {
  visible: boolean;
  setTimer: (minutes: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ visible, setTimer }) => {
  const [minutes, setMinutes] = useState('5');

  const handleMinutesChange = (text: string) => {
    setMinutes(text);
  };

  const handleSave = () => {
    setTimer(parseInt(minutes) * 60 * 1000);
  };

  return (
    <View style={{ display: visible ? 'flex' : 'none' }}>
      <Text>Set timer duration (in minutes):</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleMinutesChange}
        value={minutes}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};
