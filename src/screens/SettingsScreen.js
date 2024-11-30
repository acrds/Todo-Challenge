import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Title, Switch, Avatar } from 'react-native-paper';
import { useAIStore } from '../store/aiStore'; 
import styles from '../styles/SettingsStyles';

const SettingsScreen = () => {
  const { selectedAI, toggleAI } = useAIStore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Preferences app</Title>
      <Avatar.Icon size={80} icon="bee" style={styles.avatar} />
      <Text style={styles.subtitle}>To Bee</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generative AI</Text>

        <View style={styles.option}>
          <Text style={styles.optionText}>Watson</Text>
          <Switch
            value={selectedAI === 'ibm'}
            onValueChange={() => toggleAI()} 
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>GPT</Text>
          <Switch
            value={selectedAI === 'gpt'}
            onValueChange={() => toggleAI()} 
          />
        </View>

      </View>
    </ScrollView>
  );
};

export default SettingsScreen;