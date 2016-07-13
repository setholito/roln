var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var listSchema = new Schema({
	'name' : String,
  'tasks' : Array
});

module.exports = mongoose.model('List', listSchema);