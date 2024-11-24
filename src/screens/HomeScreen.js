import React from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-paper';
import  {useNavigation} from '@react-navigation/native';
import {listProjects} from '../services/auth';

export default function HomeScreen() {
    const navigation = useNavigation();

    const list = async () => {
        try {
            const response = await listProjects();
            console.log(response) 
        } catch (error) {
            console.log(error)
        } 
      };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Go to Config" mode="contained" onPress={list}/>
      </View>
    );
  }