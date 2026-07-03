function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="completeTask(this)">${task}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}

function completeTask(task) {
    if (task.style.textDecoration === "line-through") {
        task.style.textDecoration = "none";
        task.style.color = "black";
    } else {
        task.style.textDecoration = "line-through";
        task.style.color = "green";
    }
}
