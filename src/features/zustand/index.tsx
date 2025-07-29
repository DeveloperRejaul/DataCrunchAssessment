import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { create } from 'zustand';
import { router } from 'expo-router';

export const useStore = create((set) => ({
  bears: 0,
  increment: () => set((state) => ({ bears: state.bears + 1 })),
  decrement: () => set((state) => ({ bears: state.bears - 1 })),
  incrementByValue: (newBears) => set((state) => ({ bears: state.bears + newBears })),
}));

export default function Zustand() {
  const bears = useStore((state) => state.bears);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const incrementByValue = useStore((state) => state.incrementByValue);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{bears}</Text>
      <TouchableOpacity onPress={increment}>
        <Text>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrement}>
        <Text>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => incrementByValue(5)}>
        <Text>Update By Value</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/zustand2')}>
        <Text>GOTO Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
}
