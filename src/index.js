import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import {
    checkRecordAudioPermission,
    checkExtStorageReadPermission,
    checkExtStorageWritePermission,
    requestRecordAudioPermission,
    requestExtStorageReadPermission,
    requestExtStorageWritePermission } from './utils/appPermissions';
import StoreProvider from './store/storeProvider'
import Home from './components/Home';
import * as Colors from './themes/Colors';

export default function Main(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);

    // first check the permission to use the mic.
    // Ask for the permission if not already granted.
    // update 'havePermission' state value
    useEffect(() => {
        (async () => {
            let isAPGranted = await checkRecordAudioPermission();
            let isESRPGranted = await checkExtStorageReadPermission();
            let isESWPGranted = await checkExtStorageWritePermission();
            if (isAPGranted && isESRPGranted && isESWPGranted) {
                setPermissionStatus(true);
            } else {
                if (!isAPGranted) {
                    isAPGranted = await requestRecordAudioPermission();
                }
                if (!isESRPGranted) {
                    isESRPGranted = await requestExtStorageReadPermission();
                }
                if (!isESWPGranted) {
                    isESWPGranted = await requestExtStorageWritePermission();
                }
                
                if (isAPGranted && isESRPGranted && isESWPGranted) {
                    setPermissionStatus(true);
                }
            }
        })();
    }, []);

    const safeAreaInsets = useSafeArea();
    const viewStyle = {
        ...styles.container,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right
    };
    
    if (havePermission) {
        return (
            <StoreProvider>
                <View style={viewStyle}>
                    <Home />
                </View>
            </StoreProvider>
        );
    }

    return (
        <View style={viewStyle}>
            <Text>The app needs to have permission to use the mic to be functional.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.background_dark,
    }
});