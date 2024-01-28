require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const Exercise = require('./model/exercise_model')
const User = require('./model/user_model')
const log = require('./model//log_model')


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('public'))


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { console.log("MongoDB connection established")})
.catch(() => { console.error({Error: "Invalid connection"}, error)})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get("/api/users", async (req, res) => {
const allUsers = await User.find({})
res.json(allUsers)
})

app.post("/api/users", async (req, res) => {
  const users = {username: req.body.username};
  //////NOTE/////
  /////whatever variable that is passed through the model dot mongoose-method mus conform to the blue print of the model created.////////////////////////////
  //example: "users" is an object because the model(blue print) is of type object
  const newUser = await User.create(users);
  //////////////newUser.username, newUser,_id, newUse._v can be used to access the different variables attached to newUser//////////////////////
  res.json({username: newUser.username, _id: newUser._id});
  
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
