/**
 * Created by mantoci on 18/04/15.
 */

'use strict';

describe('my app', function() {

    it('should print "Hello world!""', function() {
        browser.get('index.html');
        expect(browser.getTitle()).toEqual('ES6 Stack');
        expect(element(by.id('test')).getText()).toBe('Hello world!');
    });

});
