import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function UnTouchableMenuItem(props) {
    return (
        <View style={styles.menuItemContainer}>
            <View style={styles.iconContainer}>
                <Icon
                    name={props.itemIconName}
                    size={35}
                    color="black"
                />
            </View>
            <View style={styles.innerMenuContainer}>
                <Text style={styles.menuItemText}>{props.itemText}</Text>
                <Text style={styles.menuItemSubText}>{props.itemSubText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    iconContainer: {

    },
    innerMenuContainer: {
        marginLeft: 30,
        justifyContent: 'center'
    },
    menuItemText: {
        fontSize: 18
    },
    menuItemSubText: {
        fontSize: 12
    }
});