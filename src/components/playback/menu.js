import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

import { TouchableMenuItem } from '../common/touchableMenuItem';
import { deleteAudioFile } from '../../utils/fileManagement';

export default function Menu(props) {
    const { isModalVisible, toggleModal, name } = props;

    const onDeletePress = async () => {
        console.log('Delete clicked.');
        const result = await deleteAudioFile(name);
        if (result.error) {
            console.log(result.error.message);
        }
        toggleModal(false);
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