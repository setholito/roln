var Backbone = require('backbone');
var TaskModel = require('../models/TaskModel');

var TasksCollection = Backbone.Collection.extend({
  url: '/tasks',
  model: TaskModel
});

module.exports = TasksCollection;