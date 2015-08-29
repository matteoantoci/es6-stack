import backbone from 'backbone';
import $ from 'jquery';
import TodoEditableList from './components/TodoEditableList.js';

require('../../scss/app.scss');

let Router = backbone.Router.extend({
    /* define the route and function maps for this router */
    routes: {
        'about': 'showAbout',
        /* Sample usage: http://example.com/#about */

        'todo/:id': 'getTodo',
        /* This is an example of using a ':param' variable which allows us to match
         any of the components between two URL slashes */
        /* Sample usage: http://example.com/#todo/5 */

        'search/:query': 'searchTodos',
        /* We can also define multiple routes that are bound to the same map function,
         in this case searchTodos(). Note below how we're optionally passing in a
         reference to a page number if one is supplied */
        /* Sample usage: http://example.com/#search/job */

        'search/:query/p:page': 'searchTodos',
        /* As we can see, URLs may contain as many ':param's as we wish */
        /* Sample usage: http://example.com/#search/job/p1 */

        'todos/:id/download/*documentPath': 'downloadDocument',
        /* This is an example of using a *splat. Splats are able to match any number of
         URL components and can be combined with ':param's*/
        /* Sample usage: http://example.com/#todos/5/download/files/Meeting_schedule.doc */

        /* If you wish to use splats for anything beyond default routing, it's probably a good
         idea to leave them at the end of a URL otherwise you may need to apply regular
         expression parsing on your fragment */

        '*other': 'defaultRoute',
        /* This is a default route that also uses a *splat. Consider the
         default route a wildcard for URLs that are either not matched or where
         the user has incorrectly typed in a route path manually */
        /* Sample usage: http://example.com/# <anything> */

        'optional(/:item)': 'optionalItem',
        'named/optional/(y:z)': 'namedOptionalItem'
        /* Router URLs also support optional parts via parentheses, without having
         to use a regex.  */
    },

    showAbout: function showAbout() {
    },

    getTodo: function getTodo(id) {
        /*
         Note that the id matched in the above route will be passed to this function
         */
        console.log('You are trying to reach todo ' + id);
    },

    searchTodos: function searchTodos(query, page) {
        let pageNumber = page || 1;
        console.log('Page number: ' + pageNumber + ' of the results for todos containing the word: ' + query);
    },

    downloadDocument: function downloadDocument(id, path) {
    },

    defaultRoute: function defaultRoute(other) {
        let todoWidget = new TodoEditableList({el: $('#todoWidget')});
        todoWidget.render();
        let todoWidgetClone = new TodoEditableList({el: $('#todoWidgetClone')});
        todoWidgetClone.render();
    }
});

global.app = function main() {
    new Router();
    backbone.history.start();
};
