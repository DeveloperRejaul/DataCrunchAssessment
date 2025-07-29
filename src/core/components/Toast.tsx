
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import Icon from '@expo/vector-icons/Ionicons';
import { rcp } from '../utils/rcp';
import { colors } from '../constance/colors';

interface IShowData {
  title?: string,
  message: string
  hideDuration?: number,
  bgColor?: string
  titleColor?: string
  messageColor?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

interface IAnimatedToast {
  show: (data: IShowData, cb?: () => void) => void
}

export const animatedToast: IAnimatedToast = {
  show: () => { },
};

export default function AnimatedToast() {
  const { width: WIDTH } = useWindowDimensions();
  const TOAST_WIDTH = 350;
  const OFFSET = WIDTH - TOAST_WIDTH;
  const ANIMATED_VISIBLE_VALUE = 50;
  const ANIMATED_HIDE_VALUE = -100;
  const top = useSharedValue(ANIMATED_HIDE_VALUE);
  const [tostData, setTostData] = useState<IShowData>({} as IShowData);

  useEffect(() => {
    animatedToast.show = function show(data: IShowData, cb?: () => void) {
      setTostData(data);
      top.value = withSpring(ANIMATED_VISIBLE_VALUE, {}, () => {
        top.value = withDelay(data.hideDuration || 1000, withSpring(ANIMATED_HIDE_VALUE, {}, () => {
          if (cb) runOnJS(cb)?.();
        }));
      });
    };
  }, []);

  const hide = () => {
    top.value = withSpring(ANIMATED_HIDE_VALUE);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    display: top.get() === ANIMATED_HIDE_VALUE ? 'none' : 'flex',
  }));

  const getBg = (type:IShowData['type']) => {
    switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    case 'info':
      return colors.error;
    case 'warning':
      return colors.error;
    default:
      return colors.success;
    }
  };

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          top,
          width: TOAST_WIDTH,
          left: OFFSET / 2,
          right: OFFSET / 2,
          backgroundColor: getBg(tostData.type),
        }, animatedStyle]}
    >
      <TouchableOpacity
        onPress={hide}
        style={styles.close}
      >
        <Icon name="close" color={colors.dark} size={20} />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: tostData?.titleColor || colors.dark }}> {tostData?.title || 'Action Message'}</Text>
      <Text style={{ ...styles.message, color: tostData?.messageColor || colors.dark }}> {tostData.message || ''}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
  },
  message: {
    fontSize: 14,
    padding: 0,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: rcp(colors.active, 10),
    borderRadius: 20,
    padding: 5,
  },
});
  
  
  