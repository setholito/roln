var Backbone = require('backbone');
var TagView = require('./TagView');

var TagsView = Backbone.View.extend({
  
  el: '<ul class="tagsView"></ul>',

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    var _this = this;

    this.$el.html('');

    this.collection.each(function(tag){
      var tagView = new TagView({model: tag});
      _this.$el.append(tagView.render().el);
    });

    return this;
  }

});

module.exports = TagsView;