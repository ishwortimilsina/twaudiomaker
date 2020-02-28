import React, { useContext } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StateContext, ActionContext } from '../AppContext';

import * as Colors from '../themes/Colors';

export default function QualityPicker(props) {
    const { recordingQuality } = useContext(StateContext);
    const { changeRecordingQuality } = useContext(ActionContext);

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Icon
                    name="tune"
                    size={25}
                    color="black"
                />
                <Text style={styles.labelStyle}>Rec. Quality </Text>
            </View>
            <View style={styles.innerContainer}>
                <Picker
                    selectedValue={recordingQuality}
                    onValueChange={changeRecordingQuality}
                    style={styles.pickerStyle}
                >
                    <Picker.Item label = "High" value = "high" />
                    <Picker.Item label = "Medium" value = "medium" />
                    <Picker.Item label = "Low" value = "low" />
                    <Picker.Item label = "Very Low" value = "very_low" />
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
        width: 150
    },
    labelStyle: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold'
    }
});