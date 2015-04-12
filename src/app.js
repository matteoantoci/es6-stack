import {Module} from './model/Module';

global.app = function () {
    var myModule = new Module();
    document.write(myModule.getMessage());
};
