import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import StorageSwitch from './storageSwitch';
import QualityPicker from './qualityPicker';
import * as Colors from '../themes/Colors';
import HorizontalLine from '../components/common/horizontalLine';
  
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerInnerContainer}>
                <View style={styles.topBand} />
                <View style={styles.drawerMain}>
                    <View style={styles.innerSection}>
                        <Text style={styles.sectionTitle}>Settings</Text>
                        <StorageSwitch />
                        <QualityPicker />
                        <HorizontalLine />
                    </View>
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
        height: 200,
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
        backgroundColor: Colors.background_light,
        paddingTop: 20,
        paddingBottom: 20
    },
    innerSection: {
        paddingLeft: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text_medium
    }
});

export default CustomDrawerContent;