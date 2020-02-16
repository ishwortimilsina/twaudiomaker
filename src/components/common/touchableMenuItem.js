import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export function TouchableMenuItem(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.menuItemContainer}
            disabled={props.disabled}
        >
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
    }
});