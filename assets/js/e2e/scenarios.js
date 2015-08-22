/**
 * Created by mantoci on 18/04/15.
 */

describe('my app', function() {
    it('should print "Hello world!""', function() {
        browser.get('index.html');
        expect(browser.getTitle()).toEqual('ES6 Stack');
    });
});
