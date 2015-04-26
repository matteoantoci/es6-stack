import {Module} from '../src/model/Module';

describe("Module", function () {

    it('it write "Hello world!"', function () {
        let moduleToTest = new Module();
        expect(moduleToTest.getMessage()).toEqual("Hello world!");
    });

});
