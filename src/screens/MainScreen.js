import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import HomeScreenContent from './HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlanScreen from '../screens/PlanScreen';

export default function MainScreen() {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'plan', title: 'Plan', focusedIcon: 'calendar-check', unfocusedIcon: 'calendar-check-outline' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreenContent,
        plan: PlanScreen,
        settings: SettingsScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }} 
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: '#2482ff' }} 
        />
    );
}