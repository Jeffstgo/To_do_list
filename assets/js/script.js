const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");


/* Genera las tareas */
let tasks = [];

/* Generar ID random */
function generateUniqueId() {
  return Math.floor(10 + Math.random() * 90); 
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
      <div class="task-info">
        <input type="checkbox" class="complete-checkbox" id="task-${task.id}" ${
      task.completed ? "checked" : ""
    } onclick="toggleComplete(${task.id})">
        <label for="task-${task.id}">ID: ${task.id}</label>
        <span>${task.description}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
    `;
    taskList.appendChild(taskItem);
  });
  updateSummary();
}

function updateSummary() {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter((task) => task.completed).length;
}

function addTask() {
  const taskDescription = taskInput.value.trim();
  if (taskDescription) {
    const newTask = {
      id: generateUniqueId(),
      description: taskDescription,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

addTaskButton.addEventListener("click", addTask);
renderTasks();
