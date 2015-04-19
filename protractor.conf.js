/**
 * Created by mantoci on 18/04/15.
 */

exports.config = {
    // The address of a running selenium server.
    seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    },

    framework: 'jasmine',

    directConnect: true,

    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }

};
