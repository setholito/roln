var Backbone = require('backbone');
var ListView = require('./ListView');
var ListModel = require('../models/ListModel');

var ListsView = Backbone.View.extend({

  el : '<div class="col-xs-12">\
          <div class="row">\
            <div class="col-xs-12 col-md-4">\
              <img class="logo" width="150" src="src/images/roln-logo.svg" alt="">\
            </div>\
            <div class="col-xs-12 col-md-4">\
              <div class="listsForm">\
                <form>\
                  <label>New List</label><br>\
                  <div class="input-group">\
                    <input class="form-control" type="text"/>\
                    <span class="input-group-btn">\
                      <button class="btn btn-default" type="button">Add</button>\
                    </span>\
                  </div>\
                </form>\
              </div>\
            </div>\
          </div>\
          <hr>\
          <div class="row">\
            <div class="listsView"></div>\
          </div>\
        </div>',

  initialize: function(){
    this.listenTo(this.collection, 'update', this.render);
  },

  events: {
    'submit .listsForm form': 'handleFormSubmit'
  },

  render: function(){
    var _this = this;

    this.$('.listsView').html('');

    this.collection.each(function(list){
      var listView = new ListView({model: list});
      _this.$('.listsView').append(listView.render().el);
    });

    return this;
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    var listTitle = this.$('.listsForm input[type="text"]').val();
    var listModel = new ListModel({name: listTitle});

    var _this = this;

    listModel.save(null, {
      success: function(){
        _this.collection.add(listModel);
        _this.$('.listsForm input[type="text"]').val('');
      }
    });

  }

});

module.exports = ListsView;