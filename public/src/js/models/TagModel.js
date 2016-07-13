var Backbone = require('backbone');

var TagModel = Backbone.Model.extend({
  urlRoot : '/tags',
  idAttribute: '_id'
});

module.exports = TagModel;