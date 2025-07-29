/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/extensions */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { SafeAreaView } from 'react-native';
import { BottomSheetContainer } from '../core/components/BottomSheet';
import AnimatedToast from '../core/components/Toast';
import AnimatedAlert from '../core/components/AnimatedAlert';
import { api } from '../core/rtk/api';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApiProvider api={api}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        {/* Animated components with reanimated */}
        <BottomSheetContainer />
        <AnimatedToast />
        <AnimatedAlert />
      </ApiProvider>
    </SafeAreaView>
  );
}
