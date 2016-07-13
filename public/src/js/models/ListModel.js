var _ = require('underscore');
var Backbone = require('backbone');
var TasksCollection = require('../collections/TasksCollection');
var TagsCollection = require('../collections/TagsCollection');

var ListModel = Backbone.Model.extend({
  
  urlRoot: '/lists',
  idAttribute: '_id',

  parse: function(list, options) {
    if (options.parseModel === false) {
      return false;
    }

    var tasks = list.tasks || [];

    _.each(tasks, function(task){
      var tags = task.tags || [];
      task.tags = new TagsCollection(tags);
    });

    list.tasks = new TasksCollection(tasks);

    return list;
  }
});

module.exports = ListModel;