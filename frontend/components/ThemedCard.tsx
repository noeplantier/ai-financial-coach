import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const ThemedCard: React.FC<ViewProps> = ({ style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props} />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
