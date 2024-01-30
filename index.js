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




app.post("/api/users", async (req, res) => {
  const users = {username: req.body.username};
  //////NOTE/////
  /////whatever variable that is passed through the model dot mongoose-method mus conform to the blue print of the model created.////////////////////////////
  //example: "users" is an object because the model(blue print) is of type object
  const newUser = await User.create(users);
  //////////////newUser.username, newUser,_id, newUse._v can be used to access the different variables attached to newUser//////////////////////
  res.json({username: newUser.username, _id: newUser._id});
  
});


app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({})
  res.json(allUsers)
  })


// app.post("/api/users/:_id/exercises", async (req, res) => {
//   const userId = req.params._Id
//   const exercises = {
//   userId: userId,
//   description: req.body.description,
//   duration: req.body.duration,
//   }
//   if(req.body.date = " ") {
//     exercises.date = req.body.date
//   }
//   const newExercise = await Exercise.create(exercises)
//   Exercise.findById(userId, (err, userfound) => {
//     if(err) {
//       res.json({Error: "User Id not found"})
//     }
//     res.json({
//     _id: userfound._id,
//     username: userfound.username,
//     description: newExercise.description,
//     duration: newExercise.duration,
//     date: newExercise.date.toDateString()
//   })
//   })
//   res.json(newExercise)
// })

app.post("/api/users/:_id/exercises", async (req, res) => {
  const userId = req.params._id;
  const exercises = {
    userId: userId,
    description: req.body.description,
    duration: req.body.duration,
  };

  if (req.body.date === " ") {
    exercises.date = new Date();
  } else {
    exercises.date = req.body.date;
  }

  try {
    const newExercise = await Exercise.create(exercises);

    // Find and update the user with the new exercise
    const userfound = await User.findById(userId);
    if (!userfound) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the reference to the new exercise in the user's exercises array
    userfound.exercises.push(newExercise);
    await userfound.save();

    const exeOData = {
      _id: userfound._id,
      username: userfound.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString(),
    };

    res.json(exeOData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
