import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Modal from "react-native-modal";

import { TouchableMenuItem } from '../common/touchableMenuItem';
import { deleteAudioFile } from '../../utils/fileManagement';
import { ActionContext } from '../../AppContext';

export default function Menu(props) {
    const { isModalVisible, toggleModal, name, audioId } = props;
    const { removeAudioFromStore } = useContext(ActionContext);

    // Delete the audio file, and update the store
    const onDeleteConfim = async () => {
        const result = await deleteAudioFile(name);
        if (result.error) {
            console.log(result.error.message);
        } else {
            removeAudioFromStore(audioId);
        }
    };

    // on Delete menu item press, ask for confimation. If confirmed,
    // call onDeleteConfirm to actually delete the file
    const onDeletePress = () => {
        console.log('Delete clicked.');
        Alert.alert(
            'Confirm',
            `Are you sure you want to delete "${name}"?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => toggleModal(false),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: onDeleteConfim
                },
            ],
            {cancelable: true},
        );
    };

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal(!isModalVisible)}
        >
            <View style={styles.modalViewStyle}>
                <Text style={styles.menuTitle} numberOfLines={1}>{name}</Text>
                <TouchableMenuItem
                    onPress={() => console.log('Share clicked.')}
                    itemIconName="share"
                    itemText="Share"
                />
                <TouchableMenuItem
                    onPress={() => console.log('Rename clicked.')}
                    itemIconName="rename-box"
                    itemText="Rename"
                />
                <TouchableMenuItem
                    onPress={() => console.log('Move clicked.')}
                    itemIconName="folder-move"
                    itemText="Move"
                />
                <TouchableMenuItem
                    onPress={() => console.log('Details clicked.')}
                    itemIconName="ballot"
                    itemText="Details"
                />
                <TouchableMenuItem
                    onPress={onDeletePress}
                    itemIconName="delete-empty"
                    itemText="Delete"
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    kebabStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10
    },
    modalViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});