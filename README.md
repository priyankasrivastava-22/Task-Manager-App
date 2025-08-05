**Project Folder Structure (Start with this):**

Project1/

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



# Task Manager App

A simple web-based Task Manager application built with HTML, CSS, JavaScript (frontend) and Node.js with Express (backend). The app allows users to add, delete, complete, and give feedback on tasks.

---

## Features

- Add new tasks with title, description, and assigned person
- View list of tasks with status (completed/pending)
- Toggle task completion status
- Delete tasks
- Add feedback to each task
- Task summary showing total, completed, and pending tasks
- Persistent task storage using JSON file on backend

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Data storage: JSON file (`tasks.json`)
- CORS enabled for frontend-backend communication

---

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app

2. Install dependencies (Node.js and Express):

```bash
npm install express cors

3. Make sure tasks.json file exists in the root folder with initial data or empty array:

```json
[]

4. Run the backend server
node server.js
The server will run at http://localhost:3000.

5. Open the index.html file in your browser (frontend). The frontend will communicate with the backend API.

```Author
Priyanka Srivastava
GitHub: @priyankasrivastava-22


```🔗 Project Link
https://github.com/priyankasrivastava-22/Task-Manager-App

```API Endpoints
GET /api/tasks - Get all tasks

POST /api/tasks - Add new task
Body JSON: { "title": "", "description": "", "assignedTo": "" }

DELETE /api/tasks/:id - Delete task by ID



```Usage
Fill the task form and click Add Task to create a new task.

Click Complete button to toggle task status.

Click Delete to remove a task.

Click Feedback to add feedback to a task.



```License
This project is licensed under the MIT License.**Project Folder Structure (Start with this):**

Project1/

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



# Task Manager App

A simple web-based Task Manager application built with HTML, CSS, JavaScript (frontend) and Node.js with Express (backend). The app allows users to add, delete, complete, and give feedback on tasks.

---

## Features

- Add new tasks with title, description, and assigned person
- View list of tasks with status (completed/pending)
- Toggle task completion status
- Delete tasks
- Add feedback to each task
- Task summary showing total, completed, and pending tasks
- Persistent task storage using JSON file on backend

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Data storage: JSON file (`tasks.json`)
- CORS enabled for frontend-backend communication

---

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app

