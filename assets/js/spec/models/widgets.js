import $ from 'jquery';
import {widget, button} from '../../src/models/widgets';

describe('widget', function() {
    it('it sets id, width and height', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init({id: 'test', width: 123, height: 456});
        expect(widgetInstance.id).toEqual('test');
        expect(widgetInstance.width).toEqual(123);
        expect(widgetInstance.height).toEqual(456);
    });

    it('it supports size fallback', function() {
        let widgetInstance = Object.create(widget);
        widgetInstance.init();
        expect(widgetInstance.width).toEqual(50);
        expect(widgetInstance.height).toEqual(50);
    });
});

describe('button', function() {
    it('it setups a button with default label', function() {
        let buttonInstance = Object.create(button);
        buttonInstance.setup('test', {width: 300, height: 200});
        expect(buttonInstance.label).toEqual('Default');
    });
});
