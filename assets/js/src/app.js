require('../../scss/app.scss');
import homeView from './views/homeView';

global.app = function main() {
    homeView.render();
};
