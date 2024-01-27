const { Schema, model }  = require("mongoose");

const ExerciseSchema = new Schema({
  username: {type: String, required: true, unique: true},
  description: String,
  duration: Number,
 
})
module.export = model('Exercise', ExerciseSchema)