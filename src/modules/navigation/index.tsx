import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home-screen'
import PuzzleScreen from '../../screens/puzzle-screen'
import ResultScreen from '../../screens/result-screen'
import LeadersBoard from '../../screens/leaders-board'
import { screens } from '../../modules/constants';

const Stack = createNativeStackNavigator();

function Navigation() {
    const defaultProperties = {
        gestureEnabled: false,
        headerShown: false
    } as any;
    return (
        <Stack.Navigator
            initialRouteName={screens.home}
        >
            <Stack.Screen
                name={screens.home}
                component={HomeScreen}
                options={defaultProperties} />
            <Stack.Screen
                name={screens.puzzle}
                component={PuzzleScreen}
                options={defaultProperties} />

            <Stack.Screen
                name={screens.result}
                component={ResultScreen}
                options={defaultProperties} />

            <Stack.Screen
                name={screens.leadersBoard}
                component={LeadersBoard}
                options={defaultProperties} />
        </Stack.Navigator>
    );
}

export default Navigation;
