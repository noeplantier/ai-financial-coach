import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

interface GradientTextProps extends TextProps {
  colors?: string[];
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  style, 
  colors = Colors.goldGradient,
  ...props 
}) => {
  return (
    <MaskedView
      maskElement={<Text style={[style, { backgroundColor: 'transparent' }]} {...props} />}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[style, { opacity: 0 }]} {...props} />
      </LinearGradient>
    </MaskedView>
  );
};
