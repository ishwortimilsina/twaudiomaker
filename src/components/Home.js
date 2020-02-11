import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Record from './record';
import Playback from './playback';
import PlaybackList from './playback/playbackList';
import { StateContext } from '../AppContext';

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
    const { playbacks, playbackIds, selectedPlayback } = useContext(StateContext);

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Record"
                    component={Record}
                />
                <Tab.Screen
                    name="Recordings"
                    component={PlaybackList}
                />
            </Tab.Navigator>
            {/* <Playback
                selectedPlayback={
                    selectedPlayback || 
                    playbacks[playbackIds[playbackIds.length - 1]]
                }
            /> */}
        </NavigationContainer>
    );
}