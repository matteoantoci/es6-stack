/**
 * Created by mantoci on 21/08/15.
 */
import {Component} from '../BbFlux.js';
import syphon from 'backbone.syphon';
import actions from '../actions/todo';
import todoStore from '../stores/TodoStore';

// *** Never change store state in views. Always use actions! ***
let TodoEditablelist = Component.extend({
    componentDidInitialize: function componentDidInitialize() {
        todoStore.subscribeComponent(this, this.todosHaveChanged); // Subscribe to store changes
    },
    todosHaveChanged: function todosHaveChanged() {
        this.state.set('todos', todoStore.toJSON());
    },
    todoTpl: require('../../../templates/todoEditableList.mustache'), // Cache the template
    render: function render() {
        let template = this.todoTpl(this.state.toJSON());
        this.$el.html(template);
        // return this; // Useful for subviews
    },
    events: {
        'submit .todo-item-form': 'handleTodoAdd',
        'click .complete-checkbox': 'handleTodoCheckboxClick'
    },
    handleTodoAdd: function handleTodoAdd(e) {
        e.preventDefault();
        let todoItem = syphon.serialize(this); // Serialize the form
        todoItem.id = Math.floor(Math.random() * 10000); // FIXME: this is useless with proper sync on server
        actions.addTodo(todoItem);
    },
    handleTodoCheckboxClick: function handleTodoCheckboxClick(e) {
        let $item = this.$el.find(e.target).parents('.todo-item');
        let todoItem = {
            id: $item.data('id'),
            completed: e.target.checked
        };
        actions.updateTodo(todoItem);
    }
});

export default TodoEditablelist;