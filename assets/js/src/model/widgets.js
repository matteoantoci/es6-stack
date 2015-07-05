import $ from 'jquery';

let widget = {
    init: function init(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.btnTemplate = require('../../../templates/button.handlebars')();
        this.$elem = null;
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

button.setup = function setup(width, height, label) {
    // delegated call
    this.init(width, height);
    this.label = label || 'Default';
    this.$elem = $(this.btnTemplate).text(this.label);
};

button.build = function build($where) {
    // delegated call
    this.insert($where);
    this.$elem.click(this.changeLabel.bind(this));
};

button.changeLabel = function changeLabel() {
    this.$elem.text('Button "' + this.label + '" clicked!');
};


export {widget, button};
