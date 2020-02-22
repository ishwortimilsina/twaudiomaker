import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Record from './record';
import Playback from './playback';

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Record"
                component={Record}
            />
            <Tab.Screen
                name="Recordings"
                component={Playback}
            />
        </Tab.Navigator>
    );
}