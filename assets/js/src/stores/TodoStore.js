/**
 * Created by mantoci on 21/08/15.
 */
import {Store} from '../BbFlux.js';

let TodoStore = Store.extend({
    url: '/api/todos',
    storeDidInitialize: function storeDidInitialize() {
        // populates the models without triggering add events. Use it only if you can't put initial data in page.
        this.fetch({reset: true});
    },
    actions: {
        // remove the Model instance from the Store.
        'todo-delete': function todoDelete(payload) {
            this.remove(payload.model);
            // backbone.sync('delete', this);
        },
        'todo-add': function todoAdd(payload) {
            // payload.model.id = _.random(10000, 10000000);
            this.add(payload.model);
            // backbone.sync('create', this);
        },
        'todo-update': function todoUpdate(payload) {
            // do stuff...
            this.add(payload.model, {'merge': true});
            // backbone.sync('update', this);
        }
        // ... etc
    }
});

// the Store is an instantiated Collection. aka a singleton.
// (if we were to only ever have one item,
//  it would be an instantiated Model instead).
export default new TodoStore();
