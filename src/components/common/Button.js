import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../themes/Colors';

export function Button(props) {
    // For theming purposes
    styles.buttonStyle = {
        ...styles.buttonStyle,
        borderColor: Colors.background_dark
    };

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
                {props.buttonText}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        borderColor: Colors.background_dark,
        borderWidth: 1,
        marginLeft: 10,
        padding: 9,
        borderRadius: 5,
        backgroundColor: '#FFF'
    },
    buttonText: {
        color: Colors.text_medium,
        fontSize: 12,
        fontWeight: 'normal'
    },
    disabledButtonStyle: {
        borderColor: '#AAA'
    },
    disabledTextStyle: {
        color: '#AAA'
    }
});