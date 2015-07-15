import dispatcher from '../../src/dispatcher.js';
import buttonsStore from '../../src/stores/buttonsStore.js';

describe('home view', function() {
    it('needs to be initiated', function() {
        expect(buttonsStore.getState()).toEqual({});
    });
    it('stores buttons states', function() {
        buttonsStore.init();
        expect(buttonsStore.getState().button1.label).toEqual('Hello');
    });
    it('emits change event when setting state', function() {
        spyOn(dispatcher, 'emit');
        buttonsStore.init();
        expect(dispatcher.emit).toHaveBeenCalledWith('buttonsStoreHasChanged');
    });
});
