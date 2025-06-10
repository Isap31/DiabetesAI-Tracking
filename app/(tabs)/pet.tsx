import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Heart,
  Star,
  Zap,
  Crown,
  Bone,
  Gift,
  Award,
  Shield,
  ChevronDown,
} from 'lucide-react-native';

export default function PetTab() {
  const [petStats, setPetStats] = React.useState({
    health: 85,
    happiness: 92,
    level: 12,
    energy: 78,
    coins: 2450
  });

  const [selectedPetType, setSelectedPetType] = React.useState<'dog' | 'horse' | 'turtle'>('dog');

  const petTypes = {
    dog: { emoji: '🐕', name: 'Aurora the Dog', description: 'Loyal and energetic companion' },
    horse: { emoji: '🐎', name: 'Thunder the Horse', description: 'Majestic and strong companion' },
    turtle: { emoji: '🐢', name: 'Sage the Turtle', description: 'Wise and steady companion' }
  };

  const petItems = [
    { icon: Heart, name: 'Health Treat', cost: 50, description: 'Boost your pet\'s health', color: '#ef4444' },
    { icon: Star, name: 'Happy Toy', cost: 75, description: 'Increase happiness', color: '#f59e0b' },
    { icon: Zap, name: 'Energy Boost', cost: 100, description: 'Level up faster', color: '#3b82f6' },
    { icon: Bone, name: 'Premium Treat', cost: 125, description: 'Special companion treat', color: '#f97316' },
    { icon: Crown, name: 'Royal Accessory', cost: 200, description: 'Stylish companion gear', color: '#8b5cf6' },
    { icon: Gift, name: 'Mystery Box', cost: 150, description: 'Random surprise!', color: '#ec4899' }
  ];

  const currentPet = petTypes[selectedPetType];

  const handlePetAction = (action: 'feed' | 'play' | 'care') => {
    let newStats = { ...petStats };
    let coinCost = 0;

    switch (action) {
      case 'feed':
        if (petStats.coins >= 25) {
          newStats.health = Math.min(100, petStats.health + 10);
          newStats.happiness = Math.min(100, petStats.happiness + 5);
          coinCost = 25;
        }
        break;
      
      case 'play':
        if (petStats.coins >= 15) {
          newStats.happiness = Math.min(100, petStats.happiness + 15);
          newStats.energy = Math.max(0, petStats.energy - 10);
          coinCost = 15;
        }
        break;
      
      case 'care':
        if (petStats.coins >= 35) {
          newStats.health = Math.min(100, newStats.health + 5);
          newStats.happiness = Math.min(100, newStats.happiness + 10);
          newStats.energy = Math.min(100, newStats.energy + 15);
          coinCost = 35;
        }
        break;
    }

    if (coinCost > 0) {
      newStats.coins -= coinCost;
      setPetStats(newStats);
    }
  };

  const handlePurchase = (item: any) => {
    if (petStats.coins >= item.cost) {
      let newStats = { ...petStats };
      newStats.coins -= item.cost;
      
      switch (item.name) {
        case 'Health Treat':
          newStats.health = Math.min(100, newStats.health + 20);
          break;
        case 'Happy Toy':
          newStats.happiness = Math.min(100, newStats.happiness + 25);
          break;
        case 'Energy Boost':
          newStats.energy = Math.min(100, newStats.energy + 30);
          break;
        case 'Premium Treat':
          newStats.health = Math.min(100, newStats.health + 15);
          newStats.happiness = Math.min(100, newStats.happiness + 15);
          break;
        case 'Royal Accessory':
          newStats.happiness = Math.min(100, newStats.happiness + 30);
          break;
        case 'Mystery Box':
          const randomBoost = Math.floor(Math.random() * 20) + 10;
          newStats.health = Math.min(100, newStats.health + randomBoost);
          newStats.happiness = Math.min(100, newStats.happiness + randomBoost);
          break;
      }
      
      setPetStats(newStats);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pet Companion</Text>
          <Text style={styles.headerSubtitle}>Your health journey companion</Text>
        </View>

        {/* Pet Selection */}
        <View style={styles.petSelectionSection}>
          <Text style={styles.sectionTitle}>Choose Your Companion</Text>
          <View style={styles.petSelector}>
            <TouchableOpacity style={styles.petSelectorButton}>
              <Text style={styles.petEmoji}>{currentPet.emoji}</Text>
              <Text style={styles.petSelectorText}>{selectedPetType.charAt(0).toUpperCase() + selectedPetType.slice(1)}</Text>
              <ChevronDown size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Companion */}
        <View style={styles.petSection}>
          <View style={styles.petAvatar}>
            <View style={[styles.petAvatarContainer, 
              petStats.happiness >= 80 ? styles.happyPet :
              petStats.happiness >= 60 ? styles.neutralPet :
              petStats.happiness >= 40 ? styles.sadPet : styles.sickPet
            ]}>
              <Text style={styles.petEmojiLarge}>{currentPet.emoji}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{petStats.level}</Text>
            </View>
          </View>

          <Text style={styles.petName}>{currentPet.name}</Text>
          <View style={styles.petMessageContainer}>
            <Text style={styles.petMessage}>
              {petStats.happiness >= 80 && petStats.health >= 80 
                ? `${currentPet.name.split(' ')[0]} is thriving! Your consistent health management is paying off.`
                : petStats.happiness >= 60 
                ? `${currentPet.name.split(' ')[0]} feels great when your glucose is in range!`
                : `${currentPet.name.split(' ')[0]} is here to support your health journey.`}
            </Text>
          </View>

          {/* Pet Stats */}
          <View style={styles.petStatsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Heart size={16} color="#ef4444" />
                <Text style={styles.statLabel}>Health</Text>
                <Text style={styles.statValue}>{petStats.health}%</Text>
              </View>
              <View style={styles.statBar}>
                <View style={[styles.statProgress, { width: `${petStats.health}%`, backgroundColor: '#ef4444' }]} />
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Star size={16} color="#f59e0b" />
                <Text style={styles.statLabel}>Happiness</Text>
                <Text style={styles.statValue}>{petStats.happiness}%</Text>
              </View>
              <View style={styles.statBar}>
                <View style={[styles.statProgress, { width: `${petStats.happiness}%`, backgroundColor: '#f59e0b' }]} />
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Zap size={16} color="#3b82f6" />
                <Text style={styles.statLabel}>Energy</Text>
                <Text style={styles.statValue}>{petStats.energy}%</Text>
              </View>
              <View style={styles.statBar}>
                <View style={[styles.statProgress, { width: `${petStats.energy}%`, backgroundColor: '#3b82f6' }]} />
              </View>
            </View>
          </View>

          {/* Pet Care Actions */}
          <View style={styles.petActionsContainer}>
            <TouchableOpacity 
              style={styles.petActionButton}
              onPress={() => handlePetAction('feed')}
            >
              <Heart size={20} color="#ffffff" />
              <Text style={styles.petActionLabel}>Feed</Text>
              <Text style={styles.petActionCost}>25 coins</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.petActionButton}
              onPress={() => handlePetAction('play')}
            >
              <Zap size={20} color="#ffffff" />
              <Text style={styles.petActionLabel}>Play</Text>
              <Text style={styles.petActionCost}>15 coins</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.petActionButton}
              onPress={() => handlePetAction('care')}
            >
              <Star size={20} color="#ffffff" />
              <Text style={styles.petActionLabel}>Care</Text>
              <Text style={styles.petActionCost}>35 coins</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Care Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Pet Care Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Heart size={16} color="#10b981" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Keep glucose in range</Text>
                <Text style={styles.tipDescription}>Your companion's health improves when your glucose stays between 70-140 mg/dL</Text>
              </View>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Star size={16} color="#3b82f6" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Log meals regularly</Text>
                <Text style={styles.tipDescription}>Consistent logging makes your companion happier and helps them grow</Text>
              </View>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Zap size={16} color="#8b5cf6" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Exercise together</Text>
                <Text style={styles.tipDescription}>Physical activity boosts both your health and your companion's energy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pet Store */}
        <View style={styles.storeSection}>
          <View style={styles.storeHeader}>
            <Text style={styles.sectionTitle}>Pet Store</Text>
            <View style={styles.coinsDisplay}>
              <Star size={16} color="#f59e0b" />
              <Text style={styles.coinsText}>{petStats.coins} coins</Text>
            </View>
          </View>
          <View style={styles.storeGrid}>
            {petItems.map((item, index) => (
              <View key={index} style={styles.storeItem}>
                <View style={[styles.storeItemIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.storeItemName}>{item.name}</Text>
                <Text style={styles.storeItemDescription}>{item.description}</Text>
                <TouchableOpacity 
                  style={[
                    styles.storeItemButton,
                    petStats.coins >= item.cost ? styles.storeItemButtonEnabled : styles.storeItemButtonDisabled
                  ]}
                  onPress={() => handlePurchase(item)}
                  disabled={petStats.coins < item.cost}
                >
                  <Text style={[
                    styles.storeItemButtonText,
                    petStats.coins >= item.cost ? styles.storeItemButtonTextEnabled : styles.storeItemButtonTextDisabled
                  ]}>
                    {item.cost} coins
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  petSelectionSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  petSelector: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  petSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  petEmoji: {
    fontSize: 24,
  },
  petSelectorText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  petSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  petAvatar: {
    position: 'relative',
    marginBottom: 16,
  },
  petAvatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  happyPet: {
    backgroundColor: '#dcfce7',
  },
  neutralPet: {
    backgroundColor: '#f3f4f6',
  },
  sadPet: {
    backgroundColor: '#fef3c7',
  },
  sickPet: {
    backgroundColor: '#fee2e2',
  },
  petEmojiLarge: {
    fontSize: 48,
  },
  levelBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  petName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  petMessageContainer: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  petMessage: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  petStatsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    gap: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
    marginLeft: 8,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  statBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statProgress: {
    height: '100%',
    borderRadius: 4,
  },
  petActionsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  petActionButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  petActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  petActionCost: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  tipsSection: {
    padding: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tipIcon: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 14,
  },
  storeSection: {
    padding: 16,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  coinsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  storeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  storeItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    width: '47%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  storeItemIcon: {
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  storeItemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  storeItemDescription: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 14,
  },
  storeItemButton: {
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  storeItemButtonEnabled: {
    backgroundColor: '#1e293b',
  },
  storeItemButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  storeItemButtonText: {
    fontSize: 10,
    fontWeight: '600',
  },
  storeItemButtonTextEnabled: {
    color: '#ffffff',
  },
  storeItemButtonTextDisabled: {
    color: '#9ca3af',
  },
});