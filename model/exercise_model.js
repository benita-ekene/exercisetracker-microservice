const { Schema, model }  = require("mongoose");

const ExerciseSchema = new Schema({
  // user: {
  //   type: Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  userId: { type:String, required: true},
  description: String,
  duration: Number,
  date: { type: Date, default: new Date(), required: false },
})
module.export = model('Exercise', ExerciseSchema)