var _ = require('underscore');
var Backbone = require('backbone');
var ListModel = require('../models/ListModel');

var ListsCollection = Backbone.Collection.extend({
  url: '/lists',
  model: ListModel
});

module.exports = ListsCollection;