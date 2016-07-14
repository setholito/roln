var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var listSchema = new Schema({
	'name' : String,
  'tasks' : Array,
  'user': {
     type: Schema.Types.ObjectId,
     ref: 'User'
  }
});

module.exports = mongoose.model('List', listSchema);