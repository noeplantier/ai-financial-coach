import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { Colors } from '../../constants/Colors';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId });
        router.replace('/(tabs)/dashboard');
      } else {
        Alert.alert('Error', 'Log in not complete. Check your email/verification.');
      }
    } catch (err: any) {
      Alert.alert('Login Failed', err.errors ? err.errors[0].message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <View style={styles.content}>
        <GradientText style={styles.title}>Welcome Back</GradientText>
        <Text style={styles.subtitle}>Sign in to access your financial coach.</Text>

        <View style={styles.inputContainer}>
          <Mail color={Colors.textSecondary} size={20} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor={Colors.textSecondary}
            onChangeText={setEmailAddress}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color={Colors.textSecondary} size={20} style={styles.icon} />
          <TextInput
            value={password}
            placeholder="Password..."
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onSignInPress} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.background} />
          ) : (
             <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.btnText}>Sign In</Text>
                <ArrowRight size={20} color={Colors.background} style={{marginLeft: 8}} />
             </View>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={{ color: Colors.textSecondary }}>Don't have an account? </Text>
          <Link href="/sign-up">
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: Colors.background },
  content: { padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: Colors.textSecondary, marginBottom: 32 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: Colors.text, fontSize: 16 },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnText: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
});
