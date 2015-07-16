import dispatcher from '../dispatcher';
import _ from 'underscore/underscore';

let store = {

    state: {},

    init: function init() {
        /*
         return $.getJSON('http://hipsterjesus.com/api/').then(function(data) {
         return data.text;
         });
         */
        let state = {
            // TODO: async state load
            button1: {width: 250, height: 50, label: 'Hello'},
            button2: {width: 250, height: 50, label: 'World!'}
        };

        this.setState(state);
    },

    setState: function setState(state) {
        this.state = state;
        dispatcher.emit('change.buttonsStore');
    },

    changeLabel: function changeLabel(id, str) {
        let s = _.extend({}, this.state);
        s[id].label = str;
        this.setState(s);
    }

};

dispatcher.on('action.buttonHasBeenClicked', function buttonsStoreClicked($this) {
    let id = $this.attr('id');
    store.changeLabel(id, 'Clicked!');
});

store.init();

export default {
    getState: function getState() {
        // TODO: use deferred actions
        return store.state;
    }
};
