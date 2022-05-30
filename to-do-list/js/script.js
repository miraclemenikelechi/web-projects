const taskInput = document.querySelector(".taskInput input");
const taskBox = document.querySelector(".taskBox");
const filter = document.querySelectorAll(".filters span");
const clearList = document.querySelector(".clear");
let ToDo = JSON.parse(localStorage.getItem("todoList"));
let edited = false;
let editId;

// user wants to set a todo
taskInput.addEventListener("keyup", entry => {
    let userTask = taskInput.value.trim();
    if (entry.key === "Enter" && userTask) {
        if (!edited) { // if task is not being edited (not false ie true[edited])
            if (!ToDo) { // if todo is not empty
                ToDo = []; // set localStorage (if list is cleared) to an empty array
            }
            let taskInfo = {
                name: userTask,
                status: "pending"
            };
            ToDo.push(taskInfo); // add new task to localStorage
        } else {
            ToDo[editId].name = userTask;
            edited = false;
        }
        taskInput.value = "";
        localStorage.setItem("todoList", JSON.stringify(ToDo));
        viewTasks("all");
    }
});

// view tasks from localStorage to front end
const viewTasks = (filters) => {
    let li = "";
    if (ToDo) {
        ToDo.forEach((task, id) => {
            let finished = task.status == "complete" ? "marked" : ""; // keep line through text on refresh
            let check = task.status == "complete" ? "checked" : ""; // keep checkbox checked on refresh
            if (filters == task.status || filters == "all") {
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="finishTask(this)" type="checkbox" id="${id}" ${check}>
                                <p class="${finished}">${task.name}</p>
                        </label>
                        <div class="options">
                            <i onclick="taskMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="optMenu">
                                <li onclick="editTask(${id}, '${task.name}')"><i class="uil uil-edit-alt"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-minus-circle"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<p style="text-transform: uppercase;">you do not have any task here</p>`;
};
viewTasks("all");

// user done with task
const finishTask = (checkedTask) => {
    let taskName = checkedTask.parentElement.lastElementChild; // getting the <p> element from front end
    if (checkedTask.checked) { // user checks task
        taskName.classList.add("marked");
        ToDo[checkedTask.id].status = "complete";
    } else { // user unchecks task
        taskName.classList.remove("marked");
        ToDo[checkedTask.id].status = "pending";
    }
    localStorage.setItem("todoList", JSON.stringify(ToDo)); // update localStorage
};

// user wants to view options either to edit or delete task
const taskMenu = (selectedTask) => {
    let options = selectedTask.parentElement.lastElementChild; // getting the <i> element from <div> parent element
    options.classList.add("show");
    document.addEventListener("click", elsewhere => {
        if (elsewhere.target.tagName != "I" || elsewhere.target != selectedTask) {
            options.classList.remove("show");
        }
    });
};

// user wants to edit task
const editTask = (taskId, taskName) => {
    editId = taskId;
    edited = true;
    taskInput.value = taskName;
};

// user wants to delete task
const deleteTask = (selectedTask) => {
    ToDo.splice(selectedTask, 1);
    localStorage.setItem("todoList", JSON.stringify(ToDo)); // update localStorage
    viewTasks("all");
};

// filter unfinished and completed tasks
filter.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        button.classList.add("active");
        viewTasks(button.id);
    });
});

// user wants to clear todo list
clearList.addEventListener("click", () => {
    ToDo.splice(0, ToDo.length);
    localStorage.setItem("todoList", JSON.stringify(ToDo)); // update localStorage
    viewTasks();
});