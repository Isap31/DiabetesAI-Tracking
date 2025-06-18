import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Crown,
  Check,
  X,
  Star,
  Award,
  Gift,
  Sparkles,
  Heart,
  Palette,
  Music,
  Bot,
  Mic,
  Users,
  Book,
  Target,
  Droplets,
  Activity,
  Calendar,
  Clock,
  Lock,
  Unlock,
  Shield,
  Zap,
} from 'lucide-react-native';

interface SubscriptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'annual') => void;
}

export default function SubscriptionModal({ 
  isVisible, 
  onClose,
  onSubscribe
}: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Aurora Basic',
      price: 'Free',
      description: 'Essential diabetes management with gentle guidance',
      icon: Heart,
      color: '#3b82f6',
    },
    {
      id: 'monthly',
      name: 'Aurora Premium',
      price: '$7.99',
      period: 'month',
      description: 'Advanced features for comprehensive wellness support',
      icon: Crown,
      color: '#8b5cf6',
      popular: true
    },
    {
      id: 'annual',
      name: 'Aurora Premium Annual',
      price: '$79.99',
      period: 'year',
      description: 'Save 17% with annual billing',
      icon: Star,
      color: '#ec4899',
    }
  ];

  const features = [
    {
      title: 'Glucose Tracking',
      free: true,
      premium: true,
      icon: Droplets
    },
    {
      title: 'Meal Tracking',
      free: true,
      premium: true,
      icon: Activity
    },
    {
      title: 'Basic AI Insights',
      free: true,
      premium: true,
      icon: Bot
    },
    {
      title: 'Virtual Companion',
      free: true,
      premium: true,
      icon: Heart
    },
    {
      title: 'Basic Achievements',
      free: true,
      premium: true,
      icon: Award
    },
    {
      title: 'Advanced AI Predictions',
      free: false,
      premium: true,
      icon: Zap,
      highlight: true
    },
    {
      title: 'Voice Assistant',
      free: false,
      premium: true,
      icon: Mic,
      highlight: true
    },
    {
      title: 'Care Circle',
      free: false,
      premium: true,
      icon: Users
    },
    {
      title: 'Aurora Journal',
      free: false,
      premium: true,
      icon: Book
    },
    {
      title: 'Premium Themes & Sounds',
      free: false,
      premium: true,
      icon: Palette
    },
    {
      title: 'Advanced Companion',
      free: false,
      premium: true,
      icon: Sparkles
    },
    {
      title: 'Advanced Data Export',
      free: false,
      premium: true,
      icon: Calendar
    },
    {
      title: 'Ad-Free Experience',
      free: false,
      premium: true,
      icon: Shield
    }
  ];

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Crown size={24} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Upgrade to Premium</Text>
                <Text style={styles.headerSubtitle}>Unlock the full AuroraFlow experience</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Plan Selection */}
            <View style={styles.planSelection}>
              <TouchableOpacity 
                style={[
                  styles.planOption,
                  selectedPlan === 'monthly' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <View style={styles.planHeader}>
                  <View style={[styles.planIcon, { backgroundColor: '#8b5cf6' }]}>
                    <Crown size={20} color="#ffffff" />
                  </View>
                  <View style={styles.planPopularBadge}>
                    <Text style={styles.planPopularText}>Popular</Text>
                  </View>
                </View>
                <Text style={styles.planName}>Monthly</Text>
                <Text style={styles.planPrice}>$7.99</Text>
                <Text style={styles.planPeriod}>per month</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.planOption,
                  selectedPlan === 'annual' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('annual')}
              >
                <View style={styles.planHeader}>
                  <View style={[styles.planIcon, { backgroundColor: '#ec4899' }]}>
                    <Star size={20} color="#ffffff" />
                  </View>
                  <View style={styles.planSavingsBadge}>
                    <Text style={styles.planSavingsText}>Save 17%</Text>
                  </View>
                </View>
                <Text style={styles.planName}>Annual</Text>
                <Text style={styles.planPrice}>$79.99</Text>
                <Text style={styles.planPeriod}>per year</Text>
              </TouchableOpacity>
            </View>

            {/* Feature Comparison */}
            <View style={styles.featureComparison}>
              <Text style={styles.sectionTitle}>What's Included</Text>
              
              <View style={styles.featureTable}>
                <View style={styles.featureTableHeader}>
                  <Text style={styles.featureColumnTitle}>Feature</Text>
                  <Text style={styles.planColumnTitle}>Basic</Text>
                  <Text style={styles.planColumnTitle}>Premium</Text>
                </View>
                
                {features.map((feature, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.featureRow,
                      index % 2 === 0 ? styles.featureRowEven : styles.featureRowOdd,
                      feature.highlight && styles.highlightedFeature
                    ]}
                  >
                    <View style={styles.featureCell}>
                      <feature.icon size={16} color={feature.highlight ? "#8b5cf6" : "#6b7280"} style={styles.featureIcon} />
                      <Text style={[
                        styles.featureTitle,
                        feature.highlight && styles.highlightedFeatureTitle
                      ]}>
                        {feature.title}
                      </Text>
                    </View>
                    <View style={styles.planCell}>
                      {feature.free ? (
                        <Check size={16} color="#10b981" />
                      ) : (
                        <X size={16} color="#d1d5db" />
                      )}
                    </View>
                    <View style={styles.planCell}>
                      {feature.premium ? (
                        <Check size={16} color="#10b981" />
                      ) : (
                        <X size={16} color="#d1d5db" />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Testimonials */}
            <View style={styles.testimonials}>
              <Text style={styles.sectionTitle}>What Our Users Say</Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialScroll}>
                {[
                  {
                    quote: "The premium features have transformed how I manage my diabetes. The AI predictions are remarkably accurate!",
                    name: "Sarah M.",
                    role: "Type 1, 9 years",
                    avatar: "SM"
                  },
                  {
                    quote: "The Care Circle feature helped me connect my entire family to my journey. We're all healthier now.",
                    name: "Michael R.",
                    role: "Type 2, 3 years",
                    avatar: "MR"
                  },
                  {
                    quote: "As a healthcare provider, I recommend AuroraFlow Premium to all my patients. The detailed reports are invaluable.",
                    name: "Dr. Lisa J.",
                    role: "Endocrinologist",
                    avatar: "LJ"
                  }
                ].map((testimonial, index) => (
                  <View key={index} style={styles.testimonialCard}>
                    <View style={styles.testimonialStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} color="#f59e0b" />
                      ))}
                    </View>
                    <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
                    <View style={styles.testimonialAuthor}>
                      <View style={styles.testimonialAvatar}>
                        <Text style={styles.testimonialAvatarText}>{testimonial.avatar}</Text>
                      </View>
                      <View>
                        <Text style={styles.testimonialName}>{testimonial.name}</Text>
                        <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* FAQ */}
            <View style={styles.faqSection}>
              <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
              
              <View style={styles.faqList}>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Can I switch between plans?</Text>
                  <Text style={styles.faqAnswer}>Yes, you can upgrade to Premium at any time. If you downgrade to Basic, you'll maintain Premium access until the end of your billing period.</Text>
                </View>
                
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Is my data secure?</Text>
                  <Text style={styles.faqAnswer}>Absolutely. Your health data is encrypted and securely stored. We never share your personal information with third parties without your explicit consent.</Text>
                </View>
                
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Can I get a refund if I'm not satisfied?</Text>
                  <Text style={styles.faqAnswer}>We offer a 14-day money-back guarantee for Premium subscriptions. If you're not completely satisfied, contact our support team for a full refund.</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => onSubscribe(selectedPlan)}
            >
              <Text style={styles.continueButtonText}>
                {selectedPlan === 'monthly' 
                  ? 'Subscribe for $7.99/month' 
                  : 'Subscribe for $79.99/year'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={onClose}
            >
              <Text style={styles.skipButtonText}>Continue with Basic</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              By subscribing, you agree to our Terms of Service and Privacy Policy. 
              Subscription auto-renews until canceled.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#8b5cf6',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  planSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  planOption: {
    width: '48%',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  selectedPlan: {
    borderColor: '#8b5cf6',
    backgroundColor: '#f3e8ff',
  },
  planHeader: {
    position: 'relative',
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  planIcon: {
    padding: 12,
    borderRadius: 12,
  },
  planPopularBadge: {
    position: 'absolute',
    top: -10,
    right: 0,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  planPopularText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
  },
  planSavingsBadge: {
    position: 'absolute',
    top: -10,
    right: 0,
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  planSavingsText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  planPeriod: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  featureComparison: {
    marginBottom: 24,
  },
  featureTable: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  featureColumnTitle: {
    flex: 2,
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  planColumnTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  featureRowEven: {
    backgroundColor: '#ffffff',
  },
  featureRowOdd: {
    backgroundColor: '#f9fafb',
  },
  highlightedFeature: {
    backgroundColor: '#f3e8ff',
  },
  featureCell: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 8,
  },
  featureTitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  highlightedFeatureTitle: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
  planCell: {
    flex: 1,
    alignItems: 'center',
  },
  testimonials: {
    marginBottom: 24,
  },
  testimonialScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: 280,
    marginRight: 12,
  },
  testimonialStars: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 2,
  },
  testimonialQuote: {
    fontSize: 14,
    color: '#4b5563',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  testimonialAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  testimonialRole: {
    fontSize: 12,
    color: '#6b7280',
  },
  faqSection: {
    marginBottom: 24,
  },
  faqList: {
    gap: 16,
  },
  faqItem: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  continueButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  skipButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});