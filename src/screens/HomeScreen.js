import React from 'react';
import { View, Text, Button } from 'react-native';
import  {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Go to Config" onPress={() => navigation.navigate('Config')}/>
      </View>
    );
  }