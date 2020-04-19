// Added express dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Assign a port to the express server and add a listener to listen request on that port
const PORT = 3000;

//Create instance of express server
const app = express();
//add body-parser and cors in above server instance
app.use(bodyParser.json());
app.use(cors());

//Add listener who listen all request on the server port
app.listen(PORT, function () {
  console.log("Express server listener has been initialized on port " + PORT);
});

//add post request
app.post('/express-server/enroll', function (request, response) {
  console.log(request.body)
  response.status(200).send({'message': 'User enrolled successfully!!!'});
})

app.get('/express-server/enroll', function (request, response) {
  response.send('Called get request on express server!!!');
});


