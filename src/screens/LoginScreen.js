import React from 'react';
import { View, Text, Button } from 'react-native';
import  {useNavigation} from '@react-navigation/native';

export default function ConfigScreen() {
    const navigation = useNavigation();
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Config Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
      </View>
    );
  }
