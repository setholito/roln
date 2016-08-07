var Backbone = require('backbone');
var ListView = require('./ListView');
var ListModel = require('../models/ListModel');

var ListsView = Backbone.View.extend({

  el : '<div class="listsViewContainer">\
          <div class="container-fluid">\
            <div class="row search-bg">\
              <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">\
                <div class="listsForm">\
                  <form>\
                    <label class="form-list-label">Add a New List</label><br>\
                    <div class="input-group">\
                      <input class="form-control input-lg" type="text"/>\
                      <span class="input-group-btn">\
                        <button class="btn btn-default btn-lg red" type="submit">Add</button>\
                      </span>\
                    </div>\
                  </form>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="container">\
            <div class="row">\
              <div class="col-xs-12">\
                <div class="row">\
                  <div class="listsView"></div>\
                </div>\
              </div>\
            </div>\
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

    if (listTitle !== "" && listTitle[0] !== " ") {

      var listModel = new ListModel({name: listTitle});
      var _this = this;

      listModel.save(null, {
        success: function(){
          _this.collection.add(listModel);
          _this.$('.listsForm input[type="text"]').val('');
        }
      });
    }

  }

});

module.exports = ListsView;