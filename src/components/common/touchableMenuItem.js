import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function TouchableMenuItem(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.menuItemContainer}
            disabled={props.disabled}
        >
            <Icon
                name={props.itemIconName}
                size={32}
                color="black"
            />
            <Text style={styles.menuItemText}>{props.itemText}</Text>
            {props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        paddingTop: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        marginBottom: 10
    },
    menuItemText: {
        paddingTop: 5,
        fontSize: 18,
        marginLeft: 30
    }
});