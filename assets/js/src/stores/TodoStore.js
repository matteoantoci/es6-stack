/**
 * Created by mantoci on 21/08/15.
 */
import dispatcher from '../dispatcher.js';
import backbone from 'backbone';

let TodoItem = backbone.Model.extend({});

let TodoStore = backbone.Collection.extend({
    model: TodoItem,
    url: '/todos',
    initialize: function initialize() {
        // we register a callback with the Dispatcher on init.
        this.dispatchToken = dispatcher.register(this.dispatchCallback.bind(this));
        // populates the models
        this.fetch();
    },
    dispatchCallback: function dispatchCallback(payload) {
        let actions = {
            // remove the Model instance from the Store.
            'todo-delete': function todoDelete() {
                this.remove(payload.model);
            },
            'todo-add': function todoAdd() {
                this.add(payload.model);
            },
            'todo-update': function todoUpdate() {
                // do stuff...
                this.add(payload.model, {'merge': true});
            }
            // ... etc
        };
        if (typeof actions[payload.actionType] !== 'function') {
            throw new Error('Unhandled callback for action: ' + payload.actionType);
        }
        actions[payload.actionType].apply(this);
    }
});

// the Store is an instantiated Collection. aka a singleton.
// (if we were to only ever have one item,
//  it would be an instantiated Model instead).
export default new TodoStore();
