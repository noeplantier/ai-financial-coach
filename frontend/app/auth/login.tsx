import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { GradientText } from '../../components/GradientText';
import { ParticleBackground } from '../../components/ParticleBackground';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, ArrowRight } from 'lucide-react-native';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/token' : '/api/auth/register';
      
      let body: any;
      let headers: any = { 'Content-Type': 'application/json' };
      
      if (isLogin) {
        // OAuth2PasswordRequestForm expects form data
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        body = formData.toString();
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        body = JSON.stringify({ email, password, full_name: fullName });
      }

      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8001'}${endpoint}`, {
        method: 'POST',
        headers,
        body
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      await login(data.access_token);
      
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <View style={styles.content}>
        <View style={styles.header}>
          <GradientText style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</GradientText>
          <Text style={styles.subtitle}>
            {isLogin ? 'Enter your credentials to access your financial coach.' : 'Start your journey to financial freedom.'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <User color={Colors.textSecondary} size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={Colors.textSecondary}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Mail color={Colors.textSecondary} size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock color={Colors.textSecondary} size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.background} />
            ) : (
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                <ArrowRight color={Colors.background} size={20} style={{ marginLeft: 8 }} />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchBtn}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchBtn: {
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
