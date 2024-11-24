import React from 'react';
import { View, Text } from 'react-native';
import  {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
const navigation = useNavigation();

  return (
    <View>
        <Text>
          Cadastre-se aqui
        </Text>
    </View>
  );
}
