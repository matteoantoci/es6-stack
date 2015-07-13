import $ from 'jquery';
import _ from 'underscore/underscore';
import dispatcher from '../dispatcher';

let widget = {
    init: function init(spec = {}) {
        _.defaults(spec, {width: 50, height: 50});
        this.width = spec.width;
        this.height = spec.height;
        return this;
    },
    insert: function insert($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
};

let button = Object.create(widget);

button.setup = function setup(spec = {}) {
    _.defaults(spec, {label: 'Default'});
    this.init(spec);
    this.label = spec.label;
    this.btnTemplate = require('../../../templates/button.handlebars')({label: this.label});
    this.$elem = $(this.btnTemplate);
};

button.build = function build($where) {
    this.insert($where);
    this.$elem.click(() => {
        this.changeLabel();
        dispatcher.emit('button.clicked');
    });
};

button.changeLabel = function changeLabel() {
    this.$elem.text('Button "' + this.label + '" clicked!');
};

export {widget, button};
