import $ from 'jquery';
import _ from 'underscore/underscore';
import dispatcher from '../dispatcher';

let widget = {
    init: function init(id, spec = {}) {
        this.id = id;
        _.defaults(spec, {id: Math.floor((Math.random() * 1000) + 1), width: 50, height: 50});
        this.width = spec.width;
        this.height = spec.height;
        return this;
    },
    insert: function insert($where) {
        if (this.$elem) {
            this.$elem.attr('id', this.id).css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
};

let button = Object.create(widget);

button.setup = function setup(id, spec = {}) {
    _.defaults(spec, {label: 'Default'});
    this.init(id, spec);
    this.label = spec.label;
    this.btnTemplate = require('../../../templates/button.handlebars')({label: this.label});
    this.$elem = $(this.btnTemplate);
};

button.build = function build($where) {
    this.insert($where);
    this.$elem.click(() => {
        dispatcher.emit('buttonClicked', this);
    });
};

export {widget, button};
