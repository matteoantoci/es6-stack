import {Module} from './model/Module';

require("../../scss/app.scss");

global.app = function () {
    var myModule = new Module();
    var div = document.createElement('div');
    div.id = 'test';
    div.textContent = myModule.getMessage();
    document.body.appendChild(div);
};
