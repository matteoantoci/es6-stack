import $ from 'jquery';
import {widget, button} from '../../src/models/widgets';

describe('widget', function() {
    it('it sets width and height', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init({width: 123, height: 456});
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
        widgetInstance.init({width: 100, height: 150});
        let $body = $(document.body);
        widgetInstance.$elem = $('<div id="test"></div>');
        widgetInstance.insert($body);
        let $test = $('#test');
        expect($test[0]).toBeInDOM();
        expect($test.width()).toEqual(100);
        expect($test.height()).toEqual(150);
        $test.remove(); // Reset state
    });
});

describe('button', function() {
    it('it setups a button with default label', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup({width: 300, height: 200});
        expect(buttonInstance.$elem.hasClass('btn')).toBeTruthy();
        expect(buttonInstance.$elem.text()).toEqual('Default');
    });

    it('it setups a button with custom label', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup({width: 300, height: 200, label: 'Custom'});
        expect(buttonInstance.$elem.hasClass('btn')).toBeTruthy();
        expect(buttonInstance.$elem.text()).toEqual('Custom');
    });

    it('it changes label on click', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup({width: 300, height: 200, label: 'Custom'});
        let $body = $(document.body);
        let $tpl = $('<div id="tpl" />');
        $body.append($tpl);
        buttonInstance.build($tpl);
        buttonInstance.$elem.click();
        expect(buttonInstance.$elem.text()).toEqual('Button "Custom" clicked!');
        $tpl.remove(); // Reset state
    });
});
