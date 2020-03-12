import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StoreProvider from './src/store/storeProvider';
import Main from './src';

export default function App() {
    return (
        <SafeAreaProvider>
            <StoreProvider>
                <Main />
            </StoreProvider>
        </SafeAreaProvider>
    );
}
