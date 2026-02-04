import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedCard } from '../../components/ThemedCard';
import { Settings, LogOut, Shield, CreditCard, Bell, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const MenuItem = ({ icon: Icon, title, onPress, color = Colors.text }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
        <Icon size={20} color={color} />
      </View>
      <Text style={[styles.menuText, { color }]}>{title}</Text>
    </View>
    <ChevronRight size={20} color={Colors.textSecondary} />
  </TouchableOpacity>
);

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
        
        <View style={styles.header}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <GradientText style={styles.name}>{user.fullName}</GradientText>
          <Text style={styles.email}>{user.primaryEmailAddress?.emailAddress}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ThemedCard style={styles.menuCard}>
            <MenuItem icon={CreditCard} title="Payment Methods" onPress={() => {}} color={Colors.primary} />
            <MenuItem icon={Shield} title="Security & Privacy" onPress={() => {}} />
            <MenuItem icon={Bell} title="Notifications" onPress={() => {}} />
          </ThemedCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <ThemedCard style={styles.menuCard}>
            <MenuItem icon={Settings} title="Preferences" onPress={() => {}} />
            <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut()}>
               <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${Colors.error}15` }]}>
                    <LogOut size={20} color={Colors.error} />
                  </View>
                  <Text style={[styles.menuText, { color: Colors.error }]}>Log Out</Text>
               </View>
            </TouchableOpacity>
          </ThemedCard>
        </View>

        <Text style={styles.version}>Version 1.0.2 • AI Financial Coach</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  logoutBtn: {
     flexDirection: 'row',
     alignItems: 'center',
     padding: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    color: Colors.textSecondary,
    opacity: 0.5,
    marginTop: 20,
  },
});
