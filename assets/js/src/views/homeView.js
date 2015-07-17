import $ from 'jquery';
import dispatcher from '../dispatcher';
import buttonsStore from '../stores/buttonsStore';
import {button} from '../models/widgets';

let view = {
    $el: null,

    init: function init() {
        this.$el = $('#home');
        this.$el.on('click', '.btn', function buttonClicked() {
            dispatcher.emit('action.buttonHasBeenClicked', $(this).attr('id'), 'Clicked!');
        });
    },

    getButtons: function render() {
        let buttonStates = buttonsStore.getState();
        let buttons = [];
        Object.keys(buttonStates).forEach((id) => {
            let btn = Object.create(button);
            btn.setup(id, buttonStates[id]);
            buttons.push(btn);
        });
        return buttons;
    },

    render: function render() {
        let templateData = {
            buttons: this.getButtons()
        };
        let template = require('../../../templates/home.handlebars')(templateData);
        this.$el.empty().append($(template));
    }
};

dispatcher.on('change.buttonsStore', () => {
    view.render();
});

export default {
    render: function render() {
        view.init();
        view.render();
    }
};
