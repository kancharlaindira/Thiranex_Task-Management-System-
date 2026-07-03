document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateCounter();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(taskText);
    saveTask(taskText);

    taskInput.value = "";
    updateCounter();
}

function createTask(taskText) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task">${taskText}</span>

        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const taskSpan = li.querySelector(".task");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    taskSpan.addEventListener("click", function () {
        taskSpan.classList.toggle("completed");
    });

    editBtn.addEventListener("click", function () {
        const newTask = prompt("Edit Task", taskSpan.textContent);

        if (newTask && newTask.trim() !== "") {
            updateStoredTask(taskSpan.textContent, newTask.trim());
            taskSpan.textContent = newTask.trim();
        }
    });

    deleteBtn.addEventListener("click", function () {
        removeStoredTask(taskSpan.textContent);
        li.remove();
        updateCounter();
    });

    document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task);
    });
}

function removeStoredTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(t => t !== task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStoredTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const index = tasks.indexOf(oldTask);

    if (index !== -1) {
        tasks[index] = newTask;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    document.getElementById("taskCounter").textContent =
        document.querySelectorAll("#taskList li").length;
}
