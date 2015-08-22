/**
 * Created by mantoci on 21/08/15.
 */
import backbone from 'backbone';
import $ from 'jquery';
import syphon from 'backbone.syphon';
import actions from '../actions';
import todoStore from '../stores/TodoStore';

// *** Never set state in views ***
// Instead of removing the todo from the TodoStore directly,
// we use the dispatcher. #flux
let TodoEditablelist = backbone.View.extend({
    initialize: function initialize() {
        // Re-render on store update
        this.listenTo(todoStore, 'add remove reset', this.render);
    },
    handleTodoAdd: function handleTodoAdd(e) {
        e.preventDefault();
        actions.addTodo(syphon.serialize(this));
    },
    handleTodoCheck: function handleTodoCheck(e) {
        let domItem = $(e.target).parents('.todo-item');
        actions.updateTodo({
            id: domItem.data('id'),
            completed: e.target.checked
        });
    },
    render: function render() {
        let template = require('../../../templates/todoEditableList.handlebars')({
            todoStore: todoStore.toJSON()
        });
        this.$el.html(template);
    },
    events: {
        'submit .todo-item-form': 'handleTodoAdd',
        'click .complete-checkbox': 'handleTodoCheck'
    }
});

export default TodoEditablelist;
