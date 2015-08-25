/**
 * Created by mantoci on 22/08/15.
 */
import backbone from 'backbone';
import _ from 'lodash';
import Flux from 'flux';

let dispatcher = new Flux.Dispatcher();
let BackboneModel = backbone.Model.extend({});

function dispatchCallback(payload) {
    if (typeof this.actions[payload.actionType] !== 'function') {
        throw new Error('Unhandled callback for action: ' + payload.actionType);
    }
    this.actions[payload.actionType].call(this, payload);
}

let BackboneFluxCollection = {
    model: BackboneModel,
    initialize: function initialize() {
        // We register a callback with the Dispatcher on init.
        this.dispatchToken = dispatcher.register(dispatchCallback.bind(this));
        this.storeDidInitialize();
    },
    storeDidInitialize: function storeDidInitialize() {
        // Override me to handle initialize tasks, don't use initialize!
    },
    subscribeComponent: function subscribeComponent(component, callback) {
        // Use this to bind add/remove/reset event to component
        component.listenTo(this, 'add remove change reset', function publishToComponents() {
            callback.call(component);
        });
    },
    actions: {
        /*
          Override me to have actions. Eg:
         'todo-update': function todoUpdate(payload) {
             // do stuff...
             this.add(payload.model, {'merge': true});
             backbone.sync('update', this);
         }
         */
    }
};

let BackboneFluxView = {
    initialize: function initialize() {
        this.state = new BackboneModel({defaults: this.getInitialState()}); // We set the initial state
        this.listenTo(this.state, 'change', this.render); // Listen to state changes and re-render
        this.componentDidInitialize();
    },
    componentDidInitialize: function componentDidInitialize() {
        // Override me to handle initialize tasks, don't use initialize!
    },
    getInitialState: function getInitialState() {
        return {}; // Override here component initial state
    }
};

let Store = backbone.Collection.extend(_.extend({}, BackboneFluxCollection));
let Component = backbone.View.extend(_.extend({}, BackboneFluxView));

export {Store, Component, dispatcher};
