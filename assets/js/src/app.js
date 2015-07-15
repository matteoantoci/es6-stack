require('../../scss/app.scss');
import dispatcher from './dispatcher';
import homeStore from './stores/buttonsStore';
import homeView from './views/homeView';

global.app = function main() {
    dispatcher.emit('pageLoad');
};
