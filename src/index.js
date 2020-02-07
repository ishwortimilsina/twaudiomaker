import React, { useReducer, useMemo } from 'react';

import { StateContext, ActionContext } from './AppContext';
import reducer from './store/reducer';
import initialState from './store/initialState';
import Home from './components/Home';

export default function Main(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addAudioToStore = (audio) => {
        dispatch({ type: 'addAudio', payload: audio });
    }
    const actions = useMemo(() => ({
        addAudioToStore
    }), []);    

    return (
        <StateContext.Provider value={state}>
            <ActionContext.Provider value={actions}>
                <Home />
            </ActionContext.Provider>
        </StateContext.Provider>
    );
}