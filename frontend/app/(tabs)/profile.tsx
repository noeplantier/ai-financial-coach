import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Animated Background with particles */}
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientBackground}>
          {/* Particules dorées animées */}
          {[...Array(15)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header avec Avatar */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGradientBorder}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>U</Text>
              </View>
            </View>
            {/* Edit Button */}
            <View style={styles.editButton}>
              <Text style={styles.editIcon}>✎</Text>
            </View>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.userName}>Nom d'utilisateur</Text>
          </View>
          
          <Text style={styles.userEmail}>email@example.com</Text>

          {/* Premium Badge */}
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumIcon}>★</Text>
            <Text style={styles.premiumText}>Premium Member</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>↗</Text>
            </View>
            <Text style={styles.statLabel}>Total Saved</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>$12,450</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>★</Text>
            </View>
            <Text style={styles.statLabel}>AI Score</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>92/100</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🏆</Text>
            </View>
            <Text style={styles.statLabel}>Streak</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>45 Days</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Section Account */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>ACCOUNT</Text>
              </View>
              <View style={styles.sectionUnderline} />
            </View>

            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>👤</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Personal Information</Text>
                    <Text style={styles.menuSubtitle}>Update your details</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>💳</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Payment Methods</Text>
                    <Text style={styles.menuSubtitle}>Manage your cards</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(0, 200, 83, 0.2)' }]}>
                    <Text style={styles.menuIcon}>🛡️</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Security & Privacy</Text>
                    <Text style={styles.menuSubtitle}>Password, 2FA, privacy</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(33, 150, 243, 0.2)' }]}>
                    <Text style={styles.menuIcon}>📧</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Email Preferences</Text>
                    <Text style={styles.menuSubtitle}>Manage subscriptions</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Preferences */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>PREFERENCES</Text>
              </View>
              <View style={styles.sectionUnderline} />
            </View>

            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>🔔</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Push Notifications</Text>
                    <Text style={styles.menuSubtitle}>Get app notifications</Text>
                  </View>
                </View>
                <View style={styles.toggleOn}>
                  <View style={styles.toggleCircle} />
                </View>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>📬</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Email Alerts</Text>
                    <Text style={styles.menuSubtitle}>Receive email updates</Text>
                  </View>
                </View>
                <View style={styles.toggleOn}>
                  <View style={styles.toggleCircle} />
                </View>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>🔒</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Biometric Login</Text>
                    <Text style={styles.menuSubtitle}>Use fingerprint/Face ID</Text>
                  </View>
                </View>
                <View style={styles.toggleOff}>
                  <View style={styles.toggleCircleOff} />
                </View>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(160, 160, 160, 0.2)' }]}>
                    <Text style={styles.menuIcon}>🌍</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuText}>Language</Text>
                    <Text style={styles.menuSubtitle}>English (US)</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Support */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>SUPPORT</Text>
              </View>
              <View style={styles.sectionUnderline} />
            </View>

            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(160, 160, 160, 0.2)' }]}>
                    <Text style={styles.menuIcon}>❓</Text>
                  </View>
                  <Text style={styles.menuText}>Help Center</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(160, 160, 160, 0.2)' }]}>
                    <Text style={styles.menuIcon}>📄</Text>
                  </View>
                  <Text style={styles.menuText}>Terms & Privacy</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                    <Text style={styles.menuIcon}>⭐</Text>
                  </View>
                  <Text style={styles.menuText}>Rate Our App</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.section}>
            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBox, { backgroundColor: 'rgba(255, 59, 48, 0.2)' }]}>
                    <Text style={styles.menuIcon}>🚪</Text>
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                    <Text style={styles.logoutSubtext}>See you soon!</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.version}>Version 1.0.2</Text>
            <View style={styles.appNameContainer}>
              <Text style={styles.appName}>AI Financial Coach</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  particle: {
    position: 'absolute',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#FFD700',
    opacity: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 80,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradientBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 4,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFD700',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  editIcon: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  nameContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  userEmail: {
    color: '#A0A0A0',
    fontSize: 15,
    marginBottom: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 6,
  },
  premiumIcon: {
    fontSize: 14,
    color: '#FFD700',
  },
  premiumText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 11,
    color: '#A0A0A0',
    marginBottom: 6,
    fontWeight: '600',
  },
  statValueContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitleContainer: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 1.5,
  },
  sectionUnderline: {
    height: 2.5,
    width: 35,
    backgroundColor: '#FFD700',
    marginTop: 6,
    borderRadius: 2,
  },
  menuCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0E0E0',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#808080',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  toggleOn: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
  },
  toggleOff: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3A3A3A',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  toggleCircleOff: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#666',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF3B30',
  },
  logoutSubtext: {
    fontSize: 12,
    color: '#FF3B30',
    opacity: 0.7,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
  },
  version: {
    color: '#666',
    fontSize: 12,
  },
  appNameContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  appName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
});