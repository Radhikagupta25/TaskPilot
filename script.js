const input = document.querySelector(".addTasks input");
const addBtn = document.querySelector(".addTasks button");
const hero = document.querySelector(".hero");
const filter = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    hero.innerHTML = "";

    if (tasks.length === 0) {
        hero.innerHTML = "<p>No tasks added yet!</p>";
        return;
    }

    tasks.forEach((taskObj, index) => {
        const task = document.createElement("div");
        task.classList.add("task");
        task.style.display = "flex";
        task.style.justifyContent = "space-between";
        task.style.alignItems = "center";
        task.style.width = "90%";
        task.style.margin = "10px 0";
        task.style.padding = "8px";
        task.style.backgroundColor = "#fff";
        task.style.borderRadius = "5px";

        const span = document.createElement("span");
        span.textContent = taskObj.text;
        span.style.cursor = "pointer";

        if (taskObj.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        // Toggle complete
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delBtn.style.border = "none";
        delBtn.style.background = "transparent";
        delBtn.style.cursor = "pointer";
        delBtn.style.color = "#A21B46";

        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        task.appendChild(span);
        task.appendChild(delBtn);
        hero.appendChild(task);
    });

    applyFilter();
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();
    input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function applyFilter() {
    const taskElements = document.querySelectorAll(".task");
    const value = filter.value;

    taskElements.forEach((taskEl, index) => {
        const isCompleted = tasks[index].completed;

        if (value === "all") {
            taskEl.style.display = "flex";
        } else if (value === "completed") {
            taskEl.style.display = isCompleted ? "flex" : "none";
        } else if (value === "pending") {
            taskEl.style.display = !isCompleted ? "flex" : "none";
        }
    });
}

filter.addEventListener("change", applyFilter);

renderTasks();