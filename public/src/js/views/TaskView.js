var _ = require('underscore');
var Backbone = require('backbone');
var TasksView = require('./TasksView');
var TagsView = require('./TagsView');

var TaskView = Backbone.View.extend({

  el: '<li class="taskView list-group-item"></li>',

  events: {
    'click .update': 'editTaskTitle',
    'submit .task-title form': 'saveTaskTitle',
    'click .delete': 'destroyTask'
  },

  template: _.template('\
    <span class="task-title"><%= model.get("title") %></span>\
    <span class="delete delete-task pull-right"></span>\
    <span class="update update-task pull-right"></span>\
    <div class="tagsContainer"></div>\
  '),

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    this.$el.html(this.template({model: this.model}));
    // var tagsView = new TagsView({collection: this.model.get('tags')});
    // this.$el.find('.tagsContainer').html(tagsView.render().el);

    return this;
  },

  editTaskTitle: function(e){
    e.preventDefault();
    
    var taskTitle = this.$('.task-title').text();
    this.$('.update, .delete').remove();
    var updateTitleForm = '<form><div class="input-group"><input class="form-control" type="text" value="' + taskTitle + '"/><div class="input-group-btn"><button class="btn btn-success" type="submit">Save</button></div></div></form>';

    this.$('.task-title').html(updateTitleForm);

  },

  saveTaskTitle: function(e){
    e.preventDefault();
    var editedValue = this.$('input[type="text"]').val();

    this.model.set({ title: editedValue });
    this.model.save();

  },

  destroyTask: function(e){
    e.preventDefault();
    this.model.destroy();
  }

});

module.exports = TaskView;