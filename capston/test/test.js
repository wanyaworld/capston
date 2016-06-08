var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
mongoose.model('question', new Schema({ url: String, text: String, id: Number }),'restaurants');
var questions = mongoose.model('question');
questions.find({name: 'Vella'},'-name',  {lean: true}, function(err, data) { 
    console.log(JSON.stringify(data[0].address));
});
