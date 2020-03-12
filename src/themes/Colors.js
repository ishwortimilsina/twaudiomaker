
import { store } from '../store/reducer';

const Colors = {};

const setColor = (theme) => {
    if (theme === 'red') {
        Colors.background_extra_dark = '#662D21';
        Colors.background_dark = '#CE584A';
        Colors.background_medium = '#F05F4A';
        Colors.background_light = '#C4CFE6';
        Colors.text_light = '#d9d9d9';
        Colors.text_medium = '#455a64';
        Colors.text_dark = '#263238';
        Colors.date_time_medium = '#401A14';
    } else {
        Colors.background_extra_dark = '#2C3940';
        Colors.background_dark = '#455a64';
        Colors.background_medium = '#587380';
        Colors.background_light = '#C4CFE6';
        Colors.text_light = '#d9d9d9';
        Colors.text_medium = '#455a64';
        Colors.text_dark = '#263238';
        Colors.date_time_medium = '#FFBF48';
    }
};

const theme = store.getState();
setColor(theme);

store.subscribe(() => {
    // console.log('An action was dispatched');
    const state = store.getState();
    setColor(state.theme);
});

export default Colors;