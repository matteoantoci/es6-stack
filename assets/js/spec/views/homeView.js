import $ from 'jquery';
import dispatcher from '../../src/dispatcher.js';
import homeView from '../../src/views/homeView';

describe('home view', function() {

    beforeAll(function(){
        let $body = $(document.body);
        let $el = $('<div id="home" />');
        $body.append($el);
    });

    afterEach(function(){
        $('#home').empty();
    });

    it('renders home view', function() {
        homeView.render();
        expect($('#home').find('.btn').length).toEqual(2);
    });

    it('avoids duplicating contents', function() {
        homeView.render();
        homeView.render();
        expect($('#home').find('.btn').length).toEqual(2);
    });

    it('renders on change event', function() {
        dispatcher.emit('change.buttonsStore');
        expect($('#home').find('.btn').length).toEqual(2);
    });
});
