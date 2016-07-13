var _ = require('underscore');
var Backbone = require('backbone');
var ListModel = require('../models/ListModel');

var ListsCollection = Backbone.Collection.extend({
  // url: 'https://raw.githubusercontent.com/AustinCodingAcademy/advanced-workbook/master/json/lists.json',
  url: '/lists',
  model: ListModel
});

module.exports = ListsCollection;