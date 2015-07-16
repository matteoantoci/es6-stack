import dispatcher from '../../src/dispatcher.js';
import buttonsStore from '../../src/stores/buttonsStore.js';

describe('home view', function() {
    it('stores buttons states', function() {
        expect(buttonsStore.getState().button1.label).toEqual('Hello');
    });
    it('change label when button has been clicked', function() {
        let mockBtn = {
            attr: function attr(){
                return 'button1';
            }
        };
        let expected = {
            button1: {width: 250, height: 50, label: 'Clicked!'},
            button2: {width: 250, height: 50, label: 'World!'}
        };
        dispatcher.emit('action.buttonHasBeenClicked', mockBtn);
        expect(buttonsStore.getState()).toEqual(expected);
    });
});
