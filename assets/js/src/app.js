require('../../scss/app.scss');
import homeView from './views/home.js';

global.app = function main() {
    homeView.render();
};
