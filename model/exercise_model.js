const mongoose = require('mongoose');

const { Schema, model }  = require("mongoose");

const ExerciseSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
})
module.export = model('Exercise', ExerciseSchema)