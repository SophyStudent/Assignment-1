const express = require('express'); //import the express module, which is a web application framework for Node.js
const app = express(); //creates the express server
const port = 3000; // specifies which port express will listen to for incoming requests

//This is our middleware to parse incoming JSON requests
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); //this code starts up a basic Express server that listens on port 3000. When the server starts, it logs a message to the console indicating that it's running and provides the URL where it can be accessed.
//notice that 2 arguments are passed into .listen (port and a callback function))
//create an empty array to store our tasks (in-memory database)

const tasks = [];

// no request body is needed for get or delete crud methods but a response is needed
// 2 sets methods: crud methods and express methods
// all the crud methods require a path
// but the express methods do not require a path. .listen need a port number and a callback function,
// a callback function is a function you pass into another function to run laterr, when that first function is done
//  .use needs a middleware function which may use a path
// POST, PUT, and PATCH usually do require a request body with data describing what to create or change

//create a route to get all tasks, consists of http verb, url, request, response,  function with the request body and response body
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

//create a new to-do property with a POST request, consisting of http verb, url, request, response,  function with the request body, the new to-do objects, the push nethod and response body
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
        id: Date.now(),
        title,
        description,
        completed: false
    };
    // adding our new tasks into the in-memory database
    tasks.push(newTodo);
    res.status(201).json(newTodo); //this should be the content of the response for the variable newTodo, which is the new task that was just created. The status code 201 indicates that a new resource has been successfully created.
});

app.get('/gettasks', (req, res) => {
  res.json(tasks);
}); //this code creates a GET endpoint at the path /gettasks. When a client sends a GET request to this endpoint, the server responds with a JSON representation of the tasks array, which contains all the tasks that have been added to the in-memory database. 