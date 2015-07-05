import {button} from './model/widgets';
import $ from 'jquery';
require('../../scss/app.scss');

global.app = function main() {
    let template = require('../../templates/app.handlebars');
    $(document.body).append(template);
    let $tpl = $('#tpl');

    let btn1 = Object.create(button);
    btn1.setup(250, 50, 'Hello');

    let btn2 = Object.create(button);
    btn2.setup(280, 60, 'World');

    btn1.build($tpl);
    btn2.build($tpl);
};
