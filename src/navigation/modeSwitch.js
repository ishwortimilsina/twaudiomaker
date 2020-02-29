import React, { useContext } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StateContext, ActionContext } from '../AppContext';

export default function ModeSwitch(props) {
    const { recModeChannel } = useContext(StateContext);
    const { changeRecModeChannel } = useContext(ActionContext);

    const handleValueChange = (value) => {
        if (value === true) {
            changeRecModeChannel(2);
        } else {
            changeRecModeChannel(1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Icon
                    name="microphone-variant"
                    size={25}
                    color="black"
                />
                <Text style={styles.labelStyle}>Rec. Mode </Text>
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.switchLabels}>Mono</Text>
                <Switch
                    onValueChange={handleValueChange}
                    value={recModeChannel == 2}
                />
                <Text style={styles.switchLabels}>Stereo</Text>
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