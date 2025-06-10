import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Target,
  Calendar,
  Trophy,
  Plus,
  X,
  Save,
  Edit2,
  Check,
  Trash2,
} from 'lucide-react-native';

interface Goal {
  id: number;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'yearly';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

interface GoalsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function GoalsModal({ isVisible, onClose }: GoalsModalProps) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Log 21 meals',
      description: 'Track all meals with carb content',
      type: 'weekly',
      target: 21,
      current: 18,
      unit: 'meals',
      deadline: '2024-01-21',
      completed: false
    },
    {
      id: 2,
      title: 'Exercise 5 times',
      description: 'Complete 30+ minute exercise sessions',
      type: 'weekly',
      target: 5,
      current: 3,
      unit: 'sessions',
      deadline: '2024-01-21',
      completed: false
    },
    {
      id: 3,
      title: 'Maintain 85% TIR',
      description: 'Keep glucose in target range',
      type: 'monthly',
      target: 85,
      current: 87,
      unit: '% TIR',
      deadline: '2024-01-31',
      completed: true
    },
    {
      id: 4,
      title: 'HbA1c under 7%',
      description: 'Achieve target HbA1c level',
      type: 'yearly',
      target: 7,
      current: 6.8,
      unit: '% HbA1c',
      deadline: '2024-12-31',
      completed: true
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    deadline: ''
  });

  const filteredGoals = goals.filter(goal => goal.type === activeTab);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      type: activeTab,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', description: '', target: '', unit: '', deadline: '' });
    setShowAddForm(false);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const handleUpdateProgress = (id: number, newCurrent: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, current: newCurrent, completed: newCurrent >= goal.target }
        : goal
    ));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTabIcon = (type: 'weekly' | 'monthly' | 'yearly') => {
    switch (type) {
      case 'weekly': return Calendar;
      case 'monthly': return Target;
      case 'yearly': return Trophy;
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Target size={20} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Health Goals</Text>
                <Text style={styles.headerSubtitle}>Set and track your health objectives</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {(['weekly', 'monthly', 'yearly'] as const).map((tab) => {
              const Icon = getTabIcon(tab);
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.activeTab
                  ]}
                >
                  <Icon size={16} color={activeTab === tab ? "#1e293b" : "#6b7280"} />
                  <Text style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Content */}
          <ScrollView style={styles.content}>
            {/* Add Goal Button */}
            <TouchableOpacity
              onPress={() => setShowAddForm(true)}
              style={styles.addGoalButton}
            >
              <Plus size={16} color="#6b7280" />
              <Text style={styles.addGoalText}>
                Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Goal
              </Text>
            </TouchableOpacity>

            {/* Add Goal Form */}
            {showAddForm && (
              <View style={styles.addForm}>
                <Text style={styles.formTitle}>New {activeTab} Goal</Text>
                <View style={styles.formFields}>
                  <TextInput
                    style={styles.input}
                    placeholder="Goal title"
                    value={newGoal.title}
                    onChangeText={(text) => setNewGoal({...newGoal, title: text})}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Description (optional)"
                    value={newGoal.description}
                    onChangeText={(text) => setNewGoal({...newGoal, description: text})}
                  />
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Target"
                      value={newGoal.target}
                      onChangeText={(text) => setNewGoal({...newGoal, target: text})}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Unit"
                      value={newGoal.unit}
                      onChangeText={(text) => setNewGoal({...newGoal, unit: text})}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Deadline"
                      value={newGoal.deadline}
                      onChangeText={(text) => setNewGoal({...newGoal, deadline: text})}
                    />
                  </View>
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      onPress={handleAddGoal}
                      style={styles.saveButton}
                    >
                      <Save size={16} color="#ffffff" />
                      <Text style={styles.saveButtonText}>Save Goal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowAddForm(false)}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* Goals List */}
            <View style={styles.goalsList}>
              {filteredGoals.map((goal) => (
                <View key={goal.id} style={[
                  styles.goalCard,
                  goal.completed && styles.completedGoal
                ]}>
                  <View style={styles.goalHeader}>
                    <View style={styles.goalInfo}>
                      <View style={styles.goalTitleRow}>
                        <Text style={[
                          styles.goalTitle,
                          goal.completed && styles.completedText
                        ]}>
                          {goal.title}
                        </Text>
                        {goal.completed && <Check size={16} color="#10b981" />}
                      </View>
                      {goal.description && (
                        <Text style={[
                          styles.goalDescription,
                          goal.completed && styles.completedDescription
                        ]}>
                          {goal.description}
                        </Text>
                      )}
                    </View>
                    <View style={styles.goalActions}>
                      <TouchableOpacity
                        onPress={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                        style={styles.actionButton}
                      >
                        <Edit2 size={16} color="#6b7280" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteGoal(goal.id)}
                        style={styles.actionButton}
                      >
                        <Trash2 size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Progress */}
                  <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                      <Text style={[
                        styles.progressText,
                        goal.completed && styles.completedText
                      ]}>
                        Progress: {goal.current} / {goal.target} {goal.unit}
                      </Text>
                      <Text style={[
                        styles.progressPercentage,
                        goal.completed && styles.completedText
                      ]}>
                        {Math.round(getProgressPercentage(goal.current, goal.target))}%
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { 
                            width: `${getProgressPercentage(goal.current, goal.target)}%`,
                            backgroundColor: goal.completed ? '#10b981' : '#1e293b'
                          }
                        ]}
                      />
                    </View>
                    
                    {/* Update Progress */}
                    {editingGoal === goal.id && !goal.completed && (
                      <View style={styles.updateProgress}>
                        <TextInput
                          style={styles.progressInput}
                          value={goal.current.toString()}
                          onChangeText={(text) => handleUpdateProgress(goal.id, parseFloat(text) || 0)}
                          keyboardType="numeric"
                        />
                        <Text style={styles.progressUnit}>/ {goal.target} {goal.unit}</Text>
                      </View>
                    )}
                  </View>

                  {/* Deadline */}
                  <Text style={styles.deadline}>
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </Text>
                </View>
              ))}

              {filteredGoals.length === 0 && (
                <View style={styles.emptyState}>
                  <Target size={48} color="#d1d5db" />
                  <Text style={styles.emptyTitle}>No {activeTab} goals set yet.</Text>
                  <Text style={styles.emptySubtitle}>Add your first goal to get started!</Text>
                </View>
              )}
            </View>
          </ScrollView>
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
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e293b',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    backgroundColor: '#475569',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 2,
    borderBottomColor: '#1e293b',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  addGoalText: {
    fontSize: 14,
    color: '#6b7280',
  },
  addForm: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  formFields: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputSmall: {
    flex: 1,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  goalsList: {
    gap: 16,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  completedGoal: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  completedText: {
    color: '#059669',
  },
  goalDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  completedDescription: {
    color: '#047857',
  },
  goalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  updateProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    backgroundColor: '#ffffff',
  },
  progressUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  deadline: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});