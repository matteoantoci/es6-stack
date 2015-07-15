import $ from 'jquery';
import dispatcher from '../../src/dispatcher.js';
import homeView from '../../src/views/homeView';

describe('home view', function() {
    it('renders home view', function() {
        let $body = $(document.body);
        let $test = $('<div id="#test" />');
        $body.append($test);
        homeView.render($test);
        expect($test.length).toEqual(1);
        $test.remove();
    });

    it('avoids duplicating contents', function() {
        let $body = $(document.body);
        let $test = $('<div id="#test" />');
        $body.append($test);
        homeView.render($test);
        homeView.render($test);
        expect($test.length).toEqual(1);
        $test.remove();
    });

    it('renders on change event', function() {
        let $body = $(document.body);
        let $test = $('<div id="#test" />');
        $body.append($test);
        homeView.render($test);
        dispatcher.emit('buttonsStoreHasChanged');
        expect($test.length).toEqual(1);
        $test.remove();
    });
});
