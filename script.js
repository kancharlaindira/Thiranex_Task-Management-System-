const input=document.getElementById("taskInput");
const list=document.getElementById("taskList");
const counter=document.getElementById("taskCounter");
const addBtn=document.getElementById("addBtn");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateCounter(){
    counter.textContent=tasks.length;
}

function displayTasks(){

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
        <span class="task ${task.completed?'completed':''}">
        ${task.name}
        </span>

        <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </div>
        `;

        const taskSpan=li.querySelector(".task");

        taskSpan.onclick=function(){
            tasks[index].completed=!tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        li.querySelector(".edit-btn").onclick=function(){

            let newTask=prompt("Edit Task",tasks[index].name);

            if(newTask && newTask.trim()!==""){
                tasks[index].name=newTask.trim();
                saveTasks();
                displayTasks();
            }

        };

        li.querySelector(".delete-btn").onclick=function(){

            tasks.splice(index,1);

            saveTasks();

            displayTasks();

        };

        list.appendChild(li);

    });

    updateCounter();

}

addBtn.onclick=function(){

    let value=input.value.trim();

    if(value===""){

        alert("Please enter a task");

        return;

    }

    tasks.push({
        name:value,
        completed:false
    });

    input.value="";

    saveTasks();

    displayTasks();

};

displayTasks();
