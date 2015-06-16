import {Module} from './model/Module';

require('../../scss/app.scss');

global.app = function main() {
    let myModule = new Module();
    let div = document.createElement('div');
    div.id = 'test';
    div.textContent = myModule.getMessage();
    document.body.appendChild(div);
};
