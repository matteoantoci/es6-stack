import $ from 'jquery';
import dispatcher from '../dispatcher';
import buttonsStore from '../stores/buttonsStore';
import {button} from '../models/widgets';

let $tpl = $('#home');

let api = {
    render: function render($tpl) {
        $tpl.empty();
        let buttonStates = buttonsStore.getState();
        Object.keys(buttonStates).forEach(function(id){
            let btn = Object.create(button);
            btn.setup(id, buttonStates[id]);
            btn.build($tpl);
        });
    }
};

dispatcher.on('buttonsStoreHasChanged', function() {
    api.render($tpl);
});

export default api;
