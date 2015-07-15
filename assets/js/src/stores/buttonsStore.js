import dispatcher from '../dispatcher';
import _ from 'underscore/underscore';

let defaultState = {
    button1: {width: 250, height: 50, label: 'Hello'},
    button2: {width: 250, height: 50, label: 'World!'}
};

let state = {};

let api = {
    init: function init() {
        state = _.extend({}, defaultState);
        dispatcher.emit('buttonsStoreHasChanged');
    },

    getState: function getState(){
        return state;
    }
};

dispatcher.on('pageLoad', function(){
    api.init();
});

dispatcher.on('buttonClicked', function(emitter) {
    let id = emitter.id;
    state[id].label = "Clicked!";
    dispatcher.emit('buttonsStoreHasChanged');
});

export default api;
