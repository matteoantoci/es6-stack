/**
 * Created by mantoci on 21/08/15.
 */
import {Component} from '../BbFlux.js';
import $ from 'jquery';
import syphon from 'backbone.syphon';
import actions from '../actions';
import todoStore from '../stores/TodoStore';

// *** Never change store state in views. Always use actions! ***
let TodoEditablelist = Component.extend({
    componentDidInitialize: function componentDidInitialize() {
        this.listenTo(todoStore, 'add remove reset', function updateState() {
            this.state.set('todos', todoStore.toJSON());
        });
    },
    handleTodoAdd: function handleTodoAdd(e) {
        e.preventDefault();
        let todoItem = syphon.serialize(this); // Serialize the form
        todoItem.id = Math.floor(Math.random() * 10000); // FIXME: this is useless with proper sync on server
        actions.addTodo(todoItem);
    },
    handleTodoCheck: function handleTodoCheck(e) {
        let $item = $(e.target).parents('.todo-item');
        let todoItem = {
            id: $item.data('id'),
            completed: e.target.checked
        };
        actions.updateTodo(todoItem);
    },
    template: require('../../../templates/todoEditableList.mustache'),
    render: function render() {
        let template = this.template(this.state.toJSON());
        this.$el.html(template);
    },
    events: {
        'submit .todo-item-form': 'handleTodoAdd',
        'click .complete-checkbox': 'handleTodoCheck'
    }
});

export default TodoEditablelist;
