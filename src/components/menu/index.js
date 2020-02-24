import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

import PlaybackMenu from './playbackMenu';
import DetailsMenu from './detailsMenu';
import * as Colors from '../../themes/Colors';
import RenameModal from './renameModal';

export default function Menu(props) {
    const { isModalVisible, toggleModal, item } = props;
    const [ activeMenu, setActiveMenu ] = useState('main');

    useEffect(() => {
        if (!isModalVisible) {
            setActiveMenu('main');
        }
    }, [isModalVisible]);

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal(!isModalVisible)}
        >
            <View style={styles.modalViewStyle}>
                {
                    activeMenu === 'details' ? (
                        <DetailsMenu item={item} />
                    ) : activeMenu === 'renameFile' ? (
                        <RenameModal
                            item={item}
                            toggleModal={toggleModal}
                        />
                    ) : (
                        <PlaybackMenu
                            toggleModal={toggleModal}
                            name={item.audioName}
                            audioId={item.audioId}
                            setActiveMenu={setActiveMenu}
                        />
                    )
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.background_light,
        padding: 20
    }
});