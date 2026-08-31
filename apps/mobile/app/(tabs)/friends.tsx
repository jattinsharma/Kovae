import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { colors } from '../../theme/colors';

const c = colors.dark;

const FRIENDS = [
  { id: '1', name: 'Rahul', xp: 598, level: 14, initials: 'RA' },
  { id: '2', name: 'Naina', xp: 530, level: 12, initials: 'NA' },
  { id: '3', name: 'Karan', xp: 512, level: 11, initials: 'KA' },
  { id: '4', name: 'Shream', xp: 498, level: 10, initials: 'SH' },
  { id: '5', name: 'Manav', xp: 410, level: 9, initials: 'MA' },
];

const CHALLENGES = [
  {
    id: '1',
    title: '20K Steps Challenge',
    subtitle: '7 Days Challenge',
    you: 12421,
    opponent: 'Rahul',
    opponentScore: 16890,
    total: 20000,
    daysLeft: 3,
  },
  {
    id: '2',
    title: '4 Gym Workouts',
    subtitle: 'Weekly Challenge',
    you: 2,
    opponent: 'Arjan',
    opponentScore: 3,
    total: 4,
    daysLeft: 2,
  },
];

export default function FriendsScreen() {
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard'>('friends');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <KText style={styles.title}>Friends</KText>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
            onPress={() => setActiveTab('friends')}
          >
            <KText
              style={[
                styles.tabText,
                activeTab === 'friends' && styles.tabTextActive,
              ]}
            >
              Friends
            </KText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'leaderboard' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('leaderboard')}
          >
            <KText
              style={[
                styles.tabText,
                activeTab === 'leaderboard' && styles.tabTextActive,
              ]}
            >
              Leaderboard
            </KText>
          </TouchableOpacity>
        </View>

        {/* Friend list / leaderboard */}
        <View style={styles.friendList}>
          {FRIENDS.map((friend, idx) => (
            <View key={friend.id} style={styles.friendRow}>
              <KText style={styles.rank}>{idx + 1}.</KText>
              <View
                style={[
                  styles.friendAvatar,
                  idx === 0 && { borderColor: '#FFD700' },
                  idx === 1 && { borderColor: '#C0C0C0' },
                  idx === 2 && { borderColor: '#CD7F32' },
                ]}
              >
                <KText style={styles.friendInitials}>
                  {friend.initials}
                </KText>
              </View>
              <View style={{ flex: 1 }}>
                <KText style={styles.friendName}>{friend.name}</KText>
                <KText style={styles.friendLevel}>Level {friend.level}</KText>
              </View>
              <View style={styles.xpBadge}>
                <KText style={styles.xpText}>{friend.xp} XP</KText>
              </View>
            </View>
          ))}
        </View>

        {/* Challenge a friend CTA */}
        <TouchableOpacity style={styles.challengeCta} activeOpacity={0.8}>
          <Ionicons name="flash-outline" size={20} color="#000" />
          <KText style={styles.challengeCtaText}>Challenge a Friend</KText>
        </TouchableOpacity>

        {/* Active challenges */}
        <KText style={[styles.sectionTitle, { marginTop: 28 }]}>
          Challenges
        </KText>

        <View style={styles.challengeList}>
          {CHALLENGES.map((ch) => (
            <View key={ch.id} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View>
                  <KText style={styles.challengeTitle}>{ch.title}</KText>
                  <KText style={styles.challengeSub}>{ch.subtitle}</KText>
                </View>
                <View style={styles.daysLeftBadge}>
                  <KText style={styles.daysLeftText}>
                    {ch.daysLeft} Days Left
                  </KText>
                </View>
              </View>

              {/* Progress comparison */}
              <View style={styles.compareRow}>
                <View style={styles.compareItem}>
                  <KText style={styles.compareName}>You</KText>
                  <KText style={styles.compareValue}>
                    {ch.you.toLocaleString()}
                  </KText>
                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(ch.you / ch.total) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.vsCircle}>
                  <KText style={styles.vsText}>VS</KText>
                </View>
                <View style={styles.compareItem}>
                  <KText style={styles.compareName}>{ch.opponent}</KText>
                  <KText style={styles.compareValue}>
                    {ch.opponentScore.toLocaleString()}
                  </KText>
                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFillPurple,
                        {
                          width: `${(ch.opponentScore / ch.total) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Create challenge */}
        <TouchableOpacity style={styles.createChallengeBtn} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={20} color={c.primary} />
          <KText style={styles.createChallengeText}>Create Challenge</KText>
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginTop: 12,
    marginBottom: 20,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: c.textSecondary,
  },
  tabTextActive: {
    color: '#000',
  },

  // Friends
  friendList: {
    gap: 8,
    marginBottom: 20,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.surface,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: c.border,
  },
  rank: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: c.textSecondary,
    width: 24,
  },
  friendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: c.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: c.border,
  },
  friendInitials: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#FFF',
  },
  friendName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: c.textPrimary,
    marginBottom: 1,
  },
  friendLevel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  xpBadge: {
    backgroundColor: 'rgba(191, 255, 0, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  xpText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
  },

  // Challenge CTA
  challengeCta: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  challengeCtaText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },

  // Section title
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 14,
  },

  // Challenges
  challengeList: {
    gap: 12,
    marginBottom: 16,
  },
  challengeCard: {
    backgroundColor: c.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    padding: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  challengeTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  challengeSub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  daysLeftBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  daysLeftText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#F59E0B',
  },

  // Compare
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compareItem: {
    flex: 1,
  },
  compareName: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: c.textSecondary,
    marginBottom: 4,
  },
  compareValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 8,
  },
  progressBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: c.card,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: c.primary,
  },
  progressFillPurple: {
    height: 6,
    borderRadius: 3,
    backgroundColor: c.secondary,
  },
  vsCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: c.textMuted,
  },

  // Create challenge
  createChallengeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: c.surface,
    borderRadius: 16,
    height: 52,
    borderWidth: 1,
    borderColor: c.primary,
    marginBottom: 20,
  },
  createChallengeText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: c.primary,
  },
});
