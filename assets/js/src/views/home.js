import $ from 'jquery';
import dispatcher from '../dispatcher';
import {button} from '../models/widgets';

let btn1 = Object.create(button);
btn1.setup({width: 250, height: 50, label: 'Hello'});

let btn2 = Object.create(button);
btn2.setup({width: 280, height: 60, label: 'World'});

let $tpl = $('<div id="home" />');
let $body = $(document.body);

dispatcher.on('button.clicked', function() {
    $body.append('<div>Clicked!!</div>');
});

let api = {
    render: function render() {
        if ($body.find($tpl).length) {
            $tpl.remove();
        }
        $body.append($tpl);
        btn1.build($tpl);
        btn2.build($tpl);
    }
};

export default api;
