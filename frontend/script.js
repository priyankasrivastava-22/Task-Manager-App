const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const errorMsg = document.getElementById('errorMsg');

window.onload = () => fetchTasks();

function fetchTasks() {
    fetch('http://localhost:3000/api/tasks')
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = '';
            if (data.length === 0) {
                taskList.innerHTML = '<li>No tasks available</li>';
            } else {
                data.forEach(task => addTaskToUI(task));
            }
            updateTaskSummary();
        });
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const assignedTo = document.getElementById('assignedTo').value.trim();

    if (title === '' || description === '' || assignedTo === '') {
        errorMsg.style.display = 'block';
        return;
    } else {
        errorMsg.style.display = 'none';
    }

    addTaskBtn.disabled = true;
    addTaskBtn.textContent = 'Adding...';

    fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, assignedTo })
    })
    .then(res => res.json())
    .then(task => {
        addTaskToUI(task);
        taskForm.reset();
        addTaskBtn.disabled = false;
        addTaskBtn.textContent = 'Add Task';
        updateTaskSummary();
    });
});

function addTaskToUI(task) {
    const li = document.createElement('li');
    li.className = 'task-card';
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <strong>${task.title}</strong><br>
        <span>${task.description}</span><br>
        <em>Assigned to: ${task.assignedTo}</em>
        <div class="task-buttons">
            <button class="btn-status-toggle">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="btn-feedback">Feedback</button>
            <button class="btn-delete">Delete</button>
        </div>
        <div class="feedback-text">${task.feedback ? 'Feedback: ' + task.feedback : ''}</div>
    `;

    li.querySelector('.btn-status-toggle').addEventListener('click', () => toggleTaskStatus(task.id));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
    li.querySelector('.btn-feedback').addEventListener('click', () => addFeedback(task.id));

    taskList.appendChild(li);
}

function toggleTaskStatus(id) {
    const li = document.querySelector(`li[data-id='${id}']`);
    const currentStatus = li.classList.toggle('completed-task');
    li.querySelector('.btn-status-toggle').textContent = currentStatus ? 'Undo' : 'Complete';
    updateTaskSummary();
}

function deleteTask(id) {
    fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' })
    .then(() => fetchTasks());
}

function addFeedback(id) {
    const feedback = prompt('Enter feedback for this task:');
    if (feedback) {
        const li = document.querySelector(`li[data-id='${id}']`);
        li.querySelector('.feedback-text').textContent = 'Feedback: ' + feedback;
    }
}

function updateTaskSummary() {
    const total = document.querySelectorAll('.task-card').length;
    const completed = document.querySelectorAll('.completed-task').length;
    const pending = total - completed;
    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pending: ${pending}`;
}
