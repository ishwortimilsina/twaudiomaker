import React, { useState, useEffect } from 'react';

import {
    checkRecordAudioPermission,
    checkExtStorageReadPermission,
    checkExtStorageWritePermission,
    requestRecordAudioPermission,
    requestExtStorageReadPermission,
    requestExtStorageWritePermission } from '../../utils/appPermissions';

export default function Main(props) {
    const [ havePermission, setPermissionStatus ] = useState(false);

    // first check the permission to use the mic.
    // Ask for the permission if not already granted.
    // update 'havePermission' state value
    useEffect(() => {
        (async () => {
            let isAPGranted = await checkRecordAudioPermission();
            let isESRPGranted = await checkExtStorageReadPermission();
            let isESWPGranted = await checkExtStorageWritePermission();
            if (isAPGranted && isESRPGranted && isESWPGranted) {
                setPermissionStatus(true);
            } else {
                if (!isAPGranted) {
                    isAPGranted = await requestRecordAudioPermission();
                }
                if (!isESRPGranted) {
                    isESRPGranted = await requestExtStorageReadPermission();
                }
                if (!isESWPGranted) {
                    isESWPGranted = await requestExtStorageWritePermission();
                }
                
                if (isAPGranted && isESRPGranted && isESWPGranted) {
                    setPermissionStatus(true);
                }
            }
        })();
    }, []);

    return havePermission;
}