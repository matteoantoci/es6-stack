/**
 * Created by mantoci on 21/08/15.
 */
import dispatcher from './dispatcher.js';

export default {
    deleteTodo: function deleteTodo(todoItem) {
        // dispatch 'todo-delete' action
        dispatcher.dispatch({
            actionType: 'todo-delete',
            model: todoItem
        });
    },
    addTodo: function addTodo(todoItem) {
        dispatcher.dispatch({
            actionType: 'todo-add',
            model: todoItem
        });
    }
    // ... other actions ...
};
