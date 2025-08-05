const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = require('./tasks.json');

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
    const { title, description, assignedTo } = req.body;
    const newTask = { id: Date.now(), title, description, assignedTo };
    tasks.push(newTask);
    fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
    res.status(200).json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
