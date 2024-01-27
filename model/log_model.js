const { Schema, model }  = require("mongoose");

const LogSchema = new Schema({
  username: {type: String, required: true, unique: true},
  description: String,
  duration: Number,
  
})
module.export = model('Log', LogSchema)