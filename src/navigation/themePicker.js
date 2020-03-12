import React, { useContext } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StateContext, ActionContext } from '../AppContext';

export default function QualityPicker(props) {
    const { theme } = useContext(StateContext);
    const { changeTheme } = useContext(ActionContext);

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Icon
                    name="format-color-fill"
                    size={25}
                    color="black"
                />
                <Text style={styles.labelStyle}>Theme </Text>
            </View>
            <View style={styles.innerContainer}>
                <Picker
                    selectedValue={theme}
                    onValueChange={changeTheme}
                    style={styles.pickerStyle}
                >
                    <Picker.Item label = "Military Green" value = "green" />
                    <Picker.Item label = "Red Giant" value = "red" />
                </Picker>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        marginLeft: 15
    },
    pickerStyle: {
        width: 170
    },
    labelStyle: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold'
    }
});