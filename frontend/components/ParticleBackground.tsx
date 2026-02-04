import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const NUM_PARTICLES = 25;

const Particle = ({ index }: { index: number }) => {
  const tx = useSharedValue(Math.random() * width);
  const ty = useSharedValue(Math.random() * height);
  const scale = useSharedValue(Math.random() * 0.5 + 0.5);
  const opacity = useSharedValue(Math.random() * 0.3 + 0.1);

  useEffect(() => {
    tx.value = withRepeat(
      withTiming(Math.random() * width, {
        duration: 10000 + Math.random() * 10000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    ty.value = withRepeat(
      withTiming(Math.random() * height, {
        duration: 10000 + Math.random() * 10000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    opacity.value = withRepeat(
      withTiming(Math.random() * 0.3 + 0.1, {
        duration: 2000 + Math.random() * 2000,
      }),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: tx.value },
        { translateY: ty.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
        },
        style,
      ]}
    />
  );
};

export const ParticleBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.background} />
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: Colors.primary, // Gold particles
  },
});
