var Backbone = require('backbone');
var TaskView = require('./TaskView');

var TasksView = Backbone.View.extend({
  
  el: '<ul class="tasksView list-group"></ul>',

  initialize: function(){
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    var _this = this;

    this.$el.html('');

    this.collection.each(function(task){
      var taskView = new TaskView({model: task});
      _this.$el.append(taskView.render().el);
    });

    return this;
  }

});

module.exports = TasksView;