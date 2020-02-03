import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Button(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[
                styles.buttonStyle,
                props.style,
                props.disabled ? styles.disabledButtonStyle : undefined
            ]}
            disabled={props.disabled}
        >
            <Text
                style={[
                    styles.textStyle,
                    props.disabled ? styles.disabledTextStyle : undefined
                ]}
            >
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#FFF',
        borderColor: '#0071FF',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        minWidth:150
    },
    disabledButtonStyle: {
        borderColor: '#AAA'
    },
    disabledTextStyle: {
        color: '#AAA'
    },
    textStyle: {
        textAlign: 'center',
        color: '#007AFF',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    }
});