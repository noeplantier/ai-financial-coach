import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { ThemedCard } from '../../components/ThemedCard';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Send, Sparkles } from 'lucide-react-native';


export default function Coach() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const getAdvice = async () => {
    if (loading) return;
    setLoading(true);
    setAdvice(null);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/coach/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: query }),
      });
      const data = await response.json();
      setAdvice(data.advice);
    } catch (e) {
      setAdvice("Sorry, I couldn't reach the financial brain right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: 100 }]}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sparkles color={Colors.primary} size={32} />
          </View>
          <GradientText style={styles.title}>AI Financial Coach</GradientText>
          <Text style={styles.subtitle}>
            Analyze your habits, optimize your portfolio, and get futuristic advice.
          </Text>
        </View>

        <ThemedCard style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything about your finances..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity 
            style={[styles.button, { opacity: loading ? 0.7 : 1 }]} 
            onPress={getAdvice}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.background} />
            ) : (
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Analyze & Advise</Text>
                <Send size={18} color={Colors.background} style={{ marginLeft: 8 }} />
              </View>
            )}
          </TouchableOpacity>
        </ThemedCard>

        {advice && (
          <ThemedCard style={styles.resultCard}>
            <Text style={styles.resultTitle}>Coach's Analysis</Text>
            <Text style={styles.resultText}>{advice}</Text>
          </ThemedCard>
        )}
        
        {!advice && !loading && (
           <View style={styles.suggestions}>
              <Text style={styles.suggestionTitle}>Try asking:</Text>
              {["How can I save more this month?", "Analyze my investment risk", "Am I spending too much on food?"].map((q, i) => (
                <TouchableOpacity key={i} style={styles.chip} onPress={() => setQuery(q)}>
                  <Text style={styles.chipText}>{q}</Text>
                </TouchableOpacity>
              ))}
           </View>
        )}

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
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 20,
  },
  inputCard: {
    padding: 0,
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    color: Colors.text,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCard: {
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  resultTitle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  resultText: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  suggestions: {
    marginTop: 24,
  },
  suggestionTitle: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    color: Colors.text,
  }
});
