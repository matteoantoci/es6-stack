/**
 * Created by mantoci on 18/04/15.
 */

describe('my app', function() {
    it('should print "Hello world!""', function() {
        browser.get('index.html');
        expect(browser.getTitle()).toEqual('ES6 Stack');
        var buttons = element.all(by.css('.btn'));
        expect(buttons.get(0).getText()).toBe('Hello');
        expect(buttons.get(1).getText()).toBe('World');
    });
});
