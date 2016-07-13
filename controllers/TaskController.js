var TaskModel = require('../models/TaskModel.js');

/**
* TaskController.js
*
* @description :: Server-side logic for managing tasks.
*/
module.exports = {
  
  /**
  * TaskController.list()
  */
  list: function (req, res) {
    TaskModel.find().populate('tags').exec(function (err, tasks) {
      if (err) {
        return res.json(500, {
          message: 'Error getting task.'
        });
      }
      return res.json(tasks);
    });
  },
  
  /**
  * TaskController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    TaskModel.findOne({_id: id}).populate('tags').exec(function (err, task) {
      if (err) {
        return res.json(500, {
          message: 'Error getting task.'
        });
      }
      if (!task) {
        return res.json(404, {
          message: 'No such task'
        });
      }
      return res.json(task);
    });

  },
  
  /**
  * TaskController.create()
  */
  create: function (req, res) {
    var task = new TaskModel({
			title : req.body.title,
			tags : req.body.tags,
      list : req.body.list
    });
    
    task.save(function (err, task) {
      if (err) {
        return res.json(500, {
          message: 'Error saving task',
          error: err
        });
      }
      return res.json(task);
    });
  },
  
  /**
  * TaskController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    TaskModel.findOne({_id: id}, function (err, task) {
      if (err) {
        return res.json(500, {
          message: 'Error saving task',
          error: err
        });
      }
      if (!task) {
        return res.json(404, {
          message: 'No such task'
        });
      }
      
      task.title = req.body.title ? req.body.title : task.title;
			task.tags = req.body.tags ? req.body.tags : task.tags;
      task.list = req.body.list ? req.body.list : task.list;
			
      task.save(function (err, task) {
        if (err) {
          return res.json(500, {
            message: 'Error getting task.'
          });
        }
        if (!task) {
          return res.json(404, {
            message: 'No such task'
          });
        }
        return res.json(task);
      });
    });
  },
  
  /**
  * TaskController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    TaskModel.findByIdAndRemove(id, function (err, task) {
      if (err) {
        return res.json(500, {
          message: 'Error getting task.'
        });
      }
      return res.json(task);
    });
  }
};
