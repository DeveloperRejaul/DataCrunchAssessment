import React from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface ScreenLoadingProps {
  style?: ViewStyle
}

export default function ScreenLoading(props: ScreenLoadingProps) {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
