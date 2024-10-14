
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const fs = require('node:fs');
let tasklistArray = [];

app.use(cors())

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/todo/:id', (req, res) => {
  console.log(req.params);

  res.send(req.params);
});

app.post('/todo/:id', (req, res) => {
  console.log(req.params);
  getTodoItems()
  tasklistArray.push(req.params);
  saveTaskList();
  res.send(`${req.params.id} added to databse`)
});

app.delete('/todo/:id', (req, res) => {
  // Ensures we have the latest list of tasks.
    getTodoItems();

  // Instructions:
  // Remove the requested item from the array: req.params.id
  // HINT: Remove item from array by id in javascript
  // After removing the item from the taskListArray, call saveTaskList();
    tasklistArray=   tasklistArray.filter(item =>item.id != req.params.id);
    
    saveTaskList();
    res.send(`${req.params.id} removed from the databse`);
})

app.get('/task-list', (req, res) =>{
    getTodoItems();
    res.send(tasklistArray);
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

function saveTaskList(){
  try {
    fs.writeFileSync('./cache/task-list.json', JSON.stringify(tasklistArray), 'utf-8');
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

function getTodoItems(){
  // Read './cache/task-list.json' using nodejs (Google: How To Read File Sync using Nodejs)
  // Parse the data being read using: JSON.parse(WhateeverDataIsCalled eg: data) --> JSON.parse(data)
  // Set the 'taskListArray' to the retrieved data, eg: taskListArray = ???
  // Call getTodoItems() in the "POST" request before pushing the req.params to the array.
  // Remember to restart the app to see changes.
  try {
    const taskData = JSON.parse(fs.readFileSync('./cache/task-list.json', 'utf8'));
    tasklistArray = taskData;    
    console.log(taskData);
  } catch (err) {
    console.error(err);
  }
}
