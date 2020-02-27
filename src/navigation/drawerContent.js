import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import StorageSwitch from './storageSwitch';
import * as Colors from '../themes/Colors';
  
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerInnerContainer}>
                <View style={styles.topBand} />
                <View style={styles.drawerMain}>
                    <StorageSwitch />
                </View>
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
        height: 50,
        backgroundColor: Colors.background_dark
    },
    bottomBand: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.background_dark
    },
    drawerMain: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: Colors.background_light
    }
});

export default CustomDrawerContent;