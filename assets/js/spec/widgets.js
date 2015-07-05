require('phantomjs-polyfill'); // phantomJS bind polyfill
import $ from 'jquery';

import {widget, button} from '../src/model/widgets';

describe('widget', function() {
    it('it sets width and height', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init(123, 456);
        expect(widgetInstance.width).toEqual(123);
        expect(widgetInstance.height).toEqual(456);
    });

    it('it supports size fallback', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init();
        expect(widgetInstance.width).toEqual(50);
        expect(widgetInstance.height).toEqual(50);
    });

    it('it will insert element passing dom parent node', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init(100, 150);
        let $body = $(document.body);
        widgetInstance.$elem = $('<div id="test"></div>');
        widgetInstance.insert($body);
        let $test = $('#test');
        expect($test[0]).toBeInDOM();
        expect($test.width()).toEqual(100);
        expect($test.height()).toEqual(150);
    });
});

describe('button', function() {
    it('it setups a button with default label', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup(300, 200);
        expect(buttonInstance.$elem.hasClass('btn')).toBeTruthy();
        expect(buttonInstance.$elem.text()).toEqual('Default');
        // expect(buttonInstance.$elem.width()).toEqual(300);
        // expect(buttonInstance.$elem.height()).toEqual(200);
    });

    it('it setups a button with custom label', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup(300, 200, 'Custom');
        expect(buttonInstance.$elem.hasClass('btn')).toBeTruthy();
        expect(buttonInstance.$elem.text()).toEqual('Custom');
    });

    it('it changes label on click', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup(300, 200, 'Custom');
        let $body = $(document.body);
        buttonInstance.build($body);
        buttonInstance.$elem.click();
        expect(buttonInstance.$elem.text()).toEqual('Button "Custom" clicked!');
    });
});
