import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';


function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Config')}>
        Go to Config
      </Button>
    </View>
  );
}

function ConfigScreen() {
    const navigation = useNavigation();
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Config Screen</Text>
        <Button onPress={() => navigation.navigate('Home')}>
          Go to Home
        </Button>
      </View>
    );
  }
  
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Config" component={ConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}