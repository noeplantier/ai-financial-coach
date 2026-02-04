import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { Colors } from '../../constants/Colors';
import { Mail, Lock, User, CheckCircle } from 'lucide-react-native';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Error', err.errors ? err.errors[0].message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(tabs)/dashboard');
      } else {
        Alert.alert('Error', 'Verification failed.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors ? err.errors[0].message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <View style={styles.content}>
        {!pendingVerification ? (
          <>
            <GradientText style={styles.title}>Create Account</GradientText>
            <Text style={styles.subtitle}>Start your journey to financial freedom.</Text>

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

            <TouchableOpacity style={styles.button} onPress={onSignUpPress} disabled={loading}>
              {loading ? <ActivityIndicator color={Colors.background} /> : <Text style={styles.btnText}>Sign Up</Text>}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={{ color: Colors.textSecondary }}>Already have an account? </Text>
              <Link href="/sign-in">
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Sign In</Text>
              </Link>
            </View>
          </>
        ) : (
          <>
             <GradientText style={styles.title}>Verify Email</GradientText>
             <Text style={styles.subtitle}>Check your email for the verification code.</Text>
             
             <View style={styles.inputContainer}>
                <CheckCircle color={Colors.primary} size={20} style={styles.icon} />
                <TextInput
                  value={code}
                  placeholder="Verification Code..."
                  placeholderTextColor={Colors.textSecondary}
                  onChangeText={setCode}
                  style={styles.input}
                  keyboardType="numeric"
                />
             </View>

             <TouchableOpacity style={styles.button} onPress={onPressVerify} disabled={loading}>
                {loading ? <ActivityIndicator color={Colors.background} /> : <Text style={styles.btnText}>Verify Email</Text>}
             </TouchableOpacity>
          </>
        )}
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
