var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var taskSchema = new Schema({
	'title' : String,
	'tags' : [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  'list': {
     type: Schema.Types.ObjectId,
     ref: 'List'
  }
});

module.exports = mongoose.model('Task', taskSchema);