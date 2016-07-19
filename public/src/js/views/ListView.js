var _ = require('underscore');
var Backbone = require('backbone');
var TaskModel = require('../models/TaskModel');
var TasksView = require('./TasksView');

var ListView = Backbone.View.extend({
  
  el: '<div class="listView"></div>',

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'submit .formContainer form': 'handleFormSubmit',
    'click .update-list': 'editListTitle',
    'submit .list-title': 'saveListTitle',
    'click .delete': 'destroyList'
  },

  template: _.template('\
    <div class="col-xs-12 col-md-4">\
      <div class="panel panel-default tasksContainer">\
        <div class="panel-body">\
          <h3 class="list-title"><%= model.get("name") %></h3>\
          <span class="delete delete-list pull-right"></span>\
          <span class="update update-list pull-right"></span>\
          <div class="formContainer">\
            <form>\
              <label>New Task</label>\
              <div class="input-group">\
                <input class="form-control" type="text"/>\
                <span class="input-group-btn">\
                  <button class="btn btn-default red" type="submit">Add</button>\
                </span>\
              </div>\
            </form>\
          </div>\
        </div>\
      </div>\
    </div>\
  '),

  render: function(){
    this.$el.html(this.template({model: this.model}));
    var tasksView = new TasksView({collection: this.model.get('tasks') });

    this.$el.find('.tasksContainer').append(tasksView.render().el);
    
    return this;
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    var taskTitle = this.$('.formContainer input[type="text"]').val();

    if (taskTitle !== "" && taskTitle[0] !== " ") {
      var taskModel = new TaskModel({list: this.model.get('_id'), title: taskTitle});
      var _this = this;

      taskModel.save(null, {
        success: function() {
          _this.model.get('tasks').add(taskModel);
          this.$('.formContainer input[type="text"]').val('');
        }
      });
    }

  },

  editListTitle: function(e) {
    e.preventDefault();

    var taskTitle = this.$('.list-title').text();
    var updateTitleForm = '<form><div class="input-group"><input class="form-control" type="text" value="' + taskTitle + '"/><span class="input-group-btn"><button class="btn btn-success" type="submit">Save</button></span></div></form>';

    this.$('.list-title').html(updateTitleForm);
  },

  saveListTitle: function(e) {
    e.preventDefault();
    var editedValue = this.$('input[type="text"]').val();

    this.model.set({ name: editedValue });
    this.model.save(null, {
      parseModel: false
    });
  },

  destroyList: function(e) {
    e.preventDefault();
    this.model.destroy();
  }

});

module.exports = ListView;