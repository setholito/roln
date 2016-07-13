window.$ = window.jQuery = require('jquery');

var ListsCollection = require('./collections/ListsCollection');
var ListsView = require('./views/ListsView');

var listsCollection = new ListsCollection();
listsCollection.fetch();

var listsView = new ListsView({collection: listsCollection });

$('#app').html(listsView.render().el);