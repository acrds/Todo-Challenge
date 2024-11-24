import React from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-paper';
import  {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Go to Config" mode="contained" onPress={() => navigation.navigate('Login')}/>
      </View>
    );
  }