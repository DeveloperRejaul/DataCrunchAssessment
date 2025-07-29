import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '.';

export default function Index() {
  const incrementByValue = useStore((state) => state.incrementByValue);
  const bears = useStore((state) => state.bears);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{bears}</Text>
      <TouchableOpacity onPress={() => incrementByValue(5)}>
        <Text>Increment by value</Text>
      </TouchableOpacity>
    </View>
  );
}
