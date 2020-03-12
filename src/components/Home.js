import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Record from './record';
import Playback from './playback';
import Colors from '../themes/Colors';
import { StateContext } from '../AppContext';

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
    // just so that this component re-renders during theme change
    const { theme } = useContext(StateContext);
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
                indicatorStyle: {
                    backgroundColor: Colors.background_light
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