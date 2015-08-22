/**
 * Created by mantoci on 21/08/15.
 */
import backbone from 'backbone';
import syphon from 'backbone.syphon';
import actions from '../actions';
import todoStore from '../stores/TodoStore';

// *** Never set state in views ***
// Instead of removing the todo from the TodoStore directly,
// we use the dispatcher. #flux

let TodoEditablelist = backbone.View.extend({
    initialize: function initialize() {
        // Re-render on store update
        todoStore.on('add remove reset', function refresh() {
            this.render();
        }.bind(this), this);
    },
    handleTodoAdd: function handleTodoAdd(e) {
        e.preventDefault();
        actions.addTodo(syphon.serialize(this));
    },
    render: function render() {
        let template = require('../../../templates/todoEditableList.handlebars')({todoStore: todoStore.toJSON()});
        this.$el.html(template);
    },
    events: {
        'submit #todoItemForm': 'handleTodoAdd'
    }
});

export default TodoEditablelist;
