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
        // populates the models without triggering add events. Use it only if you can't put initial data in page.
        this.fetch({reset: true});
    },
    dispatchCallback: function dispatchCallback(payload) {
        let actions = {
            // remove the Model instance from the Store.
            'todo-delete': function todoDelete() {
                this.remove(payload.model);
                // backbone.sync('delete', this);
            },
            'todo-add': function todoAdd() {
                // payload.model.id = _.random(10000, 10000000);
                this.add(payload.model);
                // backbone.sync('create', this);
            },
            'todo-update': function todoUpdate() {
                // do stuff...
                this.add(payload.model, {'merge': true});
                // backbone.sync('update', this);
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
