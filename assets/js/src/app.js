import {button} from './model/widgets';
import $ from 'jquery';
require('../../scss/app.scss');

global.app = function main() {
    let $where = $(document.body);

    let btn1 = Object.create(button);
    btn1.setup(250, 50, 'Hello');

    let btn2 = Object.create(button);
    btn2.setup(280, 60, 'World');

    btn1.build($where);
    btn2.build($where);
};
