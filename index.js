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


app.post("/api/users", (req, res) => {
  const user = req.body.username
  const newUser = User.create(user)
  console.log(newUser)
  res.json({user: newUser},)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
