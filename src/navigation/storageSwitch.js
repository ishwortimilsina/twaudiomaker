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
            <View style={styles.labelContainer}>
                <Icon
                    name="sd-storage"
                    size={25}
                    color="black"
                />
                <Text style={styles.labelStyle}>Storage </Text>
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
        justifyContent: 'space-between',
        width: '100%'
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    switchLabels: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5
    },
    labelStyle: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold'
    }
});