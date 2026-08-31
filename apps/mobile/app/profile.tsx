import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../components/ui/KText';
import { useAuthStore } from '../stores/auth-store';
import { useOnboardingStore } from '../stores/onboarding-store';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';

const c = colors.dark;

const STATS = [
  { label: 'Arc', value: '18', icon: 'flame' },
  { label: 'Workouts', value: '23', icon: 'barbell' },
  { label: 'Challenges', value: '12', icon: 'trophy' },
];

const MENU_ITEMS = [
  { icon: 'settings-outline', label: 'Account Settings', route: null },
  { icon: 'location-outline', label: 'My Gym', route: null },
  { icon: 'medal-outline', label: 'Achievements', route: null },
  { icon: 'watch-outline', label: 'Connect Devices', route: null },
  { icon: 'notifications-outline', label: 'Notifications', route: null },
  { icon: 'lock-closed-outline', label: 'Privacy', route: null },
  { icon: 'help-circle-outline', label: 'Help & Support', route: null },
  { icon: 'information-circle-outline', label: 'About Us', route: null },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const { data: onboardingData } = useOnboardingStore();

  const name = onboardingData?.name || user?.user_metadata?.full_name || 'Jattin Singh';
  const level = 12;
  const xp = 1240;
  const xpMax = 1500;
  const xpProgress = xp / xpMax;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>

        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <KText style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </KText>
          </View>
          <KText style={styles.name}>{name}</KText>
          <View style={styles.levelRow}>
            <View style={styles.levelBadge}>
              <KText style={styles.levelText}>Level {level}</KText>
            </View>
            <KText style={styles.xpText}>
              {xp.toLocaleString()} / {xpMax.toLocaleString()} XP
            </KText>
          </View>

          {/* XP bar */}
          <View style={styles.xpBarBg}>
            <View
              style={[styles.xpBarFill, { width: `${xpProgress * 100}%` }]}
            />
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Ionicons
                name={stat.icon as any}
                size={20}
                color={c.primary}
              />
              <KText style={styles.statValue}>{stat.value}</KText>
              <KText style={styles.statLabel}>{stat.label}</KText>
            </View>
          ))}
        </View>

        {/* Menu list */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                idx === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.6}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconBg}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={c.textPrimary}
                  />
                </View>
                <KText style={styles.menuLabel}>{item.label}</KText>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={c.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout()}
          activeOpacity={0.7}
        >
          <KText style={styles.logoutText}>Log Out</KText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Back
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: c.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  // Profile header
  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: c.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: 'rgba(191, 255, 0, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
  },
  xpText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  xpBarBg: {
    width: '60%',
    height: 6,
    borderRadius: 3,
    backgroundColor: c.card,
  },
  xpBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: c.primary,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: c.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },

  // Menu
  menuList: {
    backgroundColor: c.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: c.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: c.textPrimary,
  },

  // Logout
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#EF4444',
  },
});
