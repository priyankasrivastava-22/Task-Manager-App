**Project Folder Structure (Start with this):**

task-manager-app/

│

├── backend/

│   ├── tasks.json           # JSON file to store tasks

│   ├── server.js            # Node.js + Express Backend

│   ├── package.json         # Node.js project config

│

├── frontend/

│   ├── index.html           # HTML Page

│   ├── style.css            # CSS Styles

│   ├── script.js            # JavaScript for API Calls \& DOM Manipulation

│

└── README.md                # Project Documentation



**Step-by-Step Action Plan for Today (Phase 1 - Day 1):**

**1. Setup Backend:**

**a. Initialize Node.js Project:**

mkdir task-manager-app

cd task-manager-app

mkdir backend

cd backend

npm init -y

npm install express



**b. Create server.js in backend:**

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 3000;



app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Load tasks from JSON file

let tasks = require('./tasks.json');



// GET all tasks

app.get('/api/tasks', (req, res) => {

&nbsp;   res.json(tasks);

});



// POST a new task

app.post('/api/tasks', (req, res) => {

&nbsp;   const { title, description } = req.body;

&nbsp;   const newTask = { id: Date.now(), title, description };

&nbsp;   tasks.push(newTask);

&nbsp;   fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));

&nbsp;   res.status(201).json(newTask);

});



// DELETE a task by ID

app.delete('/api/tasks/:id', (req, res) => {

&nbsp;   tasks = tasks.filter(task => task.id != req.params.id);

&nbsp;   fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));

&nbsp;   res.status(200).json({ message: 'Task deleted' });

});



app.listen(PORT, () => {

&nbsp;   console.log(`Server running on http://localhost:${PORT}`);

});





**c. Create tasks.json file (initially empty array):**

\[]





**2. Setup Frontend:**

**a. Folder Structure:**

task-manager-app/frontend/

&nbsp;   ├── index.html

&nbsp;   ├── style.css

&nbsp;   └── script.js



**b. index.html**

<!DOCTYPE html>

<html lang="en">

<head>

&nbsp;   <meta charset="UTF-8">

&nbsp;   <title>Task Manager App</title>

&nbsp;   <link rel="stylesheet" href="style.css">

</head>

<body>

&nbsp;   <div class="container">

&nbsp;       <h1>Task Manager</h1>

&nbsp;       <form id="taskForm">

&nbsp;           <input type="text" id="title" placeholder="Task Title" required>

&nbsp;           <input type="text" id="description" placeholder="Task Description" required>

&nbsp;           <button type="submit">Add Task</button>

&nbsp;       </form>

&nbsp;       <ul id="taskList"></ul>

&nbsp;   </div>

&nbsp;   <script src="script.js"></script>

</body>

</html>



**c. style.css (Simple Styling)**

body {

&nbsp;   font-family: Arial, sans-serif;

&nbsp;   background: #f2f2f2;

&nbsp;   display: flex;

&nbsp;   justify-content: center;

&nbsp;   align-items: center;

&nbsp;   height: 100vh;

}



.container {

&nbsp;   background: #fff;

&nbsp;   padding: 20px;

&nbsp;   border-radius: 10px;

&nbsp;   width: 400px;

}



form input {

&nbsp;   width: 100%;

&nbsp;   padding: 10px;

&nbsp;   margin: 5px 0;

}



button {

&nbsp;   padding: 10px;

&nbsp;   background: #007bff;

&nbsp;   color: white;

&nbsp;   border: none;

&nbsp;   width: 100%;

&nbsp;   margin-top: 10px;

}



ul {

&nbsp;   list-style: none;

&nbsp;   padding: 0;

}



li {

&nbsp;   background: #e0e0e0;

&nbsp;   padding: 10px;

&nbsp;   margin-top: 10px;

&nbsp;   display: flex;

&nbsp;   justify-content: space-between;

}



**d. script.js (API Calls)**

const taskForm = document.getElementById('taskForm');

const taskList = document.getElementById('taskList');



// Load tasks on page load

window.onload = () => {

&nbsp;   fetch('http://localhost:3000/api/tasks')

&nbsp;       .then(response => response.json())

&nbsp;       .then(data => {

&nbsp;           taskList.innerHTML = '';

&nbsp;           data.forEach(task => {

&nbsp;               addTaskToUI(task);

&nbsp;           });

&nbsp;       });

};



// Add task

taskForm.addEventListener('submit', (e) => {

&nbsp;   e.preventDefault();

&nbsp;   const title = document.getElementById('title').value;

&nbsp;   const description = document.getElementById('description').value;



&nbsp;   fetch('http://localhost:3000/api/tasks', {

&nbsp;       method: 'POST',

&nbsp;       headers: { 'Content-Type': 'application/json' },

&nbsp;       body: JSON.stringify({ title, description })

&nbsp;   })

&nbsp;   .then(response => response.json())

&nbsp;   .then(task => {

&nbsp;       addTaskToUI(task);

&nbsp;       taskForm.reset();

&nbsp;   });

});



// Add Task to UI

function addTaskToUI(task) {

&nbsp;   const li = document.createElement('li');

&nbsp;   li.innerHTML = `

&nbsp;       <span>${task.title}: ${task.description}</span>

&nbsp;       <button onclick="deleteTask(${task.id})">Delete</button>

&nbsp;   `;

&nbsp;   taskList.appendChild(li);

}



// Delete Task

function deleteTask(id) {

&nbsp;   fetch(`http://localhost:3000/api/tasks/${id}`, {

&nbsp;       method: 'DELETE'

&nbsp;   })

&nbsp;   .then(response => response.json())

&nbsp;   .then(() => {

&nbsp;       window.location.reload();

&nbsp;   });

}





**3. Run Project:**

**In backend folder:**

node server.js





**Open frontend/index.html in browser.**

**Test Add/Delete tasks — data will be saved in tasks.json file.**





