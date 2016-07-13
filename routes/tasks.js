var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/TaskController.js');

/*
* GET
*/
router.get('/', function (req, res) {
  TaskController.list(req, res);
});

/*
* GET
*/
router.get('/:id', function (req, res) {
  TaskController.show(req, res);
});

/*
* POST
*/
router.post('/', function (req, res) {
  TaskController.create(req, res);
});

/*
* PUT
*/
router.put('/:id', function (req, res) {
  TaskController.update(req, res);
});

/*
* DELETE
*/
router.delete('/:id', function (req, res) {
  TaskController.remove(req, res);
});

module.exports = router;
