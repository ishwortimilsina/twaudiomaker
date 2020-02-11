import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

import { ActionContext, StateContext } from '../../AppContext';

export default function Playback(props) {

    return (
        <View style={styles.controlsContainer}>
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
    }
});