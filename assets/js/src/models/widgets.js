import $ from 'jquery';
import _ from 'underscore/underscore';

let widget = {
    init: function init(spec = {}) {
        _.defaults(spec, {
            id: Math.floor((Math.random() * 1000) + 1),
            width: 50,
            height: 50
        });
        _.extend(this, spec);
    }
};

let button = Object.create(widget);

button.setup = function setup(id, spec = {}) {
    _.defaults(spec, {
        id: id,
        label: 'Default'
    });
    this.init(spec);
};

export {widget, button};
