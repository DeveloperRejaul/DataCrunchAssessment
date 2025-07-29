import { Text, View } from 'react-native';
import React from 'react';
import { bottomSheet } from '@/src/core/components/BottomSheet';
import BottomSheet from './bottomsheet';

export default function index() {
  const handleMore = () => {
    bottomSheet.show({
      render: <BottomSheet />,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={handleMore}>
        index
      </Text>
    </View>
  );
}
