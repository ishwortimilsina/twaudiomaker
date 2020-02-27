import React, { useState, useContext } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StateContext, ActionContext } from '../AppContext';

export default function StorageSwitch(props) {
    const { storageLocation } = useContext(StateContext);
    const { changeStorageLocation } = useContext(ActionContext);

    const handleValueChange = (value) => {
        if (value === true) {
            changeStorageLocation('public');
        } else {
            changeStorageLocation('private');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="sd-storage"
                    size={35}
                    color="black"
                />
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.switchLabels}>Private</Text>
                <Switch
                    onValueChange={handleValueChange}
                    value={storageLocation === 'public'}
                />
                <Text style={styles.switchLabels}>Public</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center'
    },
    innerContainer: {
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    switchLabels: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10
    }
});