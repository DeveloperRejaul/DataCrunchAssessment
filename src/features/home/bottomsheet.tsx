import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Route, router } from 'expo-router';
import { colors } from '@/src/core/constance/colors';
import { reduceColorOpacity } from '@/src/core/utils/colorReduceOpacity';
import { bottomSheet } from '@/src/core/components/BottomSheet';

export default function BottomSheet() {
  const navigate = (path:Route) => {
    bottomSheet.hide();
    router.push(path);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/notifications')}>
        <Text style={styles.item}>Expo Push Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/zustand')}>
        <Text style={styles.item}>Zustand</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    rowGap: 20,
  },
  item: {
    backgroundColor: reduceColorOpacity(colors.active, 50),
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
