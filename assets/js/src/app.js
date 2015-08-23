require('../../scss/app.scss');
import TodoEditableList from './components/TodoEditableList.js';

global.app = function main() {
    let todoWidget = new TodoEditableList({el: '#todoWidget'});
    todoWidget.render();
    let todoWidgetClone = new TodoEditableList({el: '#todoWidgetClone'});
    todoWidgetClone.render();
};
