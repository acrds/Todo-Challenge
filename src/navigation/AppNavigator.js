// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
    //   return (
        //     <NavigationContainer>
        //       <Stack.Navigator initialRouteName="TasksScreen">
        //         <Stack.Screen name="TasksScreen" component={TasksScreen} />
        //       </Stack.Navigator>
        //     </NavigationContainer>
        //   );
        // }
import TasksScreen from '../screens/TasksScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default Stack = createStackNavigator({
  screens: {
    Tasks: TasksScreen,
  },
});