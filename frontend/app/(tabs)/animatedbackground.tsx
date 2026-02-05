import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Particle = ({ delay, duration, x }: { delay: number; duration: number; x: number }) => (
  <MotiView
    from={{
      opacity: 0,
      translateY: height,
      translateX: x,
    }}
    animate={{
      opacity: [0, 0.6, 0],
      translateY: -100,
      translateX: x + (Math.random() - 0.5) * 100,
    }}
    transition={{
      type: 'timing',
      duration: duration,
      delay: delay,
      loop: true,
    }}
    style={[
      styles.particle,
      {
        left: x,
      },
    ]}
  />
);

export const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5000,
    duration: 8000 + Math.random() * 4000,
    x: Math.random() * width,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2D2D2D', '#1A1A1A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            x={particle.x}
          />
        ))}
        
        {/* Overlay pour effet de profondeur */}
        <LinearGradient
          colors={['rgba(26, 26, 26, 0)', 'rgba(26, 26, 26, 0.3)', 'rgba(26, 26, 26, 0)']}
          style={styles.overlay}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});