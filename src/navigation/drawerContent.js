import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as Colors from '../themes/Colors';
  
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerInnerContainer}>
                <View style={styles.topBand} />
                <View style={styles.drawerMain} />
                <View style={styles.bottomBand} />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch'
    },
    topBand: {
        marginTop: -10,
        marginBottom: 20,
        height: 50,
        backgroundColor: Colors.background_dark
    },
    bottomBand: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.background_dark
    },
    drawerMain: {
        flex: 1
    }
});

export default CustomDrawerContent;