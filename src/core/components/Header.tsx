/* eslint-disable react/require-default-props */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constance/colors';
import Switch from './Switch';

interface HeaderProps {
   title: string;
  onMenuPress?: () => void;
  onBack?: () => void;
  onSwitchOn?: () => void;
  onSwitchOff?: () => void;
  showSwitch?: boolean;
}

export default function Header({ title, onMenuPress, onBack, onSwitchOn, onSwitchOff, showSwitch }:HeaderProps) {
  const handleSwitchChange = (val: boolean) => {
    if (val) {
      onSwitchOn?.();
    } else {
      onSwitchOff?.();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Ionicons name="arrow-back-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        {showSwitch && (
        <Switch
          size={42}
          onChange={handleSwitchChange}
          ballColor={colors.primary}
          ballActiveColor={colors.primary}
          borderColor={colors.dark}
          borderActiveColor={colors.primary}
        />
        )}
        {onMenuPress && (
        <TouchableOpacity onPress={onMenuPress} style={[styles.iconBtn, { marginLeft: 10 }]}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.primary} />
        </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({ android: 35 }),
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.weight,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  iconBtn: {
    padding: 6,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
