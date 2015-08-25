import TodoEditableList from './components/TodoEditableList.js';
import $ from 'jquery';

require('../../scss/app.scss');

global.app = function main() {
    let todoWidget = new TodoEditableList({el: $('#todoWidget')});
    todoWidget.render();
    let todoWidgetClone = new TodoEditableList({el: $('#todoWidgetClone')});
    todoWidgetClone.render();
};
