import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Record from './record';
import Playback from './playback';
import * as Colors from '../themes/Colors';

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                style: {
                    backgroundColor: Colors.background_dark,
                },
                activeTintColor: Colors.text_light
            }}
        >
            <Tab.Screen
                name="Record "
                component={Record}
            />
            <Tab.Screen
                name="Recordings  "
                component={Playback}
            />
        </Tab.Navigator>
    );
}