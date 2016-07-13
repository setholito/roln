var ListModel = require('../models/ListModel.js');
var TaskModel = require('../models/TaskModel.js');

var mongoose = require('mongoose');
var reversePopulate = require('mongoose-reverse-populate')

/**
* ListController.js
*
* @description :: Server-side logic for managing lists.
*/
module.exports = {
  
  /**
  * ListController.list()
  */
  list: function (req, res) {
    ListModel.find(function (err, lists) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }

      var opts = {
        modelArray: lists,
        storeWhere: 'tasks',
        arrayPop: true,
        mongooseModel: TaskModel,
        idField: 'list',
        populate: 'tags'
      }

      reversePopulate(opts, function(err, lists){
        return res.json(lists);
      });
    });
  },
  
  /**
  * ListController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    ListModel.findOne({_id: id}, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      if (!list) {
        return res.json(404, {
          message: 'No such list'
        });
      }

      TaskModel.find({ list: mongoose.Types.ObjectId(list._id) }).populate('tags').exec(function(err, tasks) {
        // attach the tasks to the list
        list.tasks = tasks;
        // be sure to explicitly set the tasks attribute of our List Schema as an Array
        // return the list
        return res.json(list);
      });
    });
  },
  
  /**
  * ListController.create()
  */
  create: function (req, res) {
    var list = new ListModel({
			name : req.body.name
    });
    
    list.save(function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      return res.json(list);
    });
  },
  
  /**
  * ListController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    ListModel.findOne({_id: id}, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      if (!list) {
        return res.json(404, {
          message: 'No such list'
        });
      }
      
      list.name = req.body.name ? req.body.name : list.name;
			
      list.save(function (err, list) {
        if (err) {
          return res.json(500, {
            message: 'Error getting list.'
          });
        }
        if (!list) {
          return res.json(404, {
            message: 'No such list'
          });
        }
        return res.json(list);
      });
    });
  },
  
  /**
  * ListController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    ListModel.findByIdAndRemove(id, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      return res.json(list);
    });
  }
};
