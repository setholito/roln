var _ = require('underscore');
var Backbone = require('backbone');
var TagsCollection = require('../collections/TagsCollection');

var TaskModel = Backbone.Model.extend({
  urlRoot: '/tasks',
  idAttribute: '_id',
  defaults: {
    tags: new Backbone.Collection()
  },

  // toJSON: function(){
  //   var attributes = _.clone(this.attributes);
  //   attributes.tags = this.attributes.tags.pluck('_id');
  //   return attributes;
  // }
  
});

module.exports = TaskModel;