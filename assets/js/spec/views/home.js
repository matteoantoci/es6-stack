import $ from 'jquery';
import homeView from '../../src/components/home.js';

describe('home view', function() {
    it('it renders home view', function() {
        let $body = $(document.body);
        homeView.render();
        let $test = $body.find('#home');
        expect($test.length).toEqual(1);
    });

    it('it avoids duplicating contents', function() {
        let $body = $(document.body);
        homeView.render();
        homeView.render();
        let $test = $body.find('#home');
        expect($test.length).toEqual(1);
    });
});
