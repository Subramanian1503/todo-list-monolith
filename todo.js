let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function renderList() {
    // Remove all the tasks from the list in user interface
    taskList.innerHTML = "";

    // Add the updated tasks to the user interface
    for (let task of tasks) {
        addTaskToDOM(task);
    }
}

function addTaskToDOM(task) {

    // Create a list element in DOM
    const listElement = document.createElement("li");

    // Update the list element with the list template with values of task object
    listElement.innerHTML =
        `<input type="checkbox" id=${task.id} ${task.done ? "checked" : ""}  class="custom-checkbox">
        <label for= ${task.id}> ${task.text}</label>
        <img src="Images/Delete_image.png" class="delete" data-id= ${task.id} />`;

    // Append the task element to the task list
    taskList.append(listElement);
}

function markTaskAsComplete(taskId) {

    // Reterive the particular task id
    let requestedTask = tasks.filter((task) => {
        if (task.id == taskId) {
            return task;
        }
    })

    // Check if the task is available
    if (requestedTask.length > 0) {
        // Mark tha particular task as completed
        let task = requestedTask[0];
        task.done = !task.done;

        // Render list
        renderList();

        // Show notification
        //showNotification("Task status changed successfully!!");
    }
    else {
        // Show notification
        showNotification("Task not found");
    }
}

function deleteTask(taskId) {

    // Remove the task with taskId from the task list
    let updatedTasks = tasks.filter((task) => {
        if (task.id != taskId) {
            return task;
        }
    })
    tasks = updatedTasks;

    // Show notification
    //showNotification("Task deleted successfully!!");

    // Render the new task list in user interface
    renderList();

    // Update the count
    decrementTaskCount();
}

function addTask(task) {
    //Add the task into the list
    tasks.push(task);

    // Show notification
    //showNotification("Task added successfully!!");

    // Update the added list in user interface
    renderList();

    // Increment the count of the task
    incrementTaskCount()
}

function incrementTaskCount() {
    // Get the value of the task counter
    let taskCount = parseInt(tasksCounter.textContent);
    console.log(taskCount);

    // Increment the value
    taskCount += 1;
    console.log(taskCount);

    // Update the incremented value in counter
    tasksCounter.textContent = taskCount;
}

function decrementTaskCount() {
    // Get the value of the task counter
    let taskCount = parseInt(tasksCounter.textContent);
    console.log(taskCount);

    // Decrement the value
    taskCount -= 1;
    console.log(taskCount);

    // Update the incremented value in counter
    tasksCounter.textContent = taskCount;
}

function showNotification(text) {
    alert(text);
}

function handleTaskInput(event) {
    if (event.key == "Enter") {
        // Get the text from the element
        let taskMessage = event.target.value;

        // Validate whether the text is valid
        if (!taskMessage) {
            showNotification("Invalid task information provided!!");
            return;
        }

        // Convert that into a task object
        const task = {
            text: taskMessage,
            id: Date.now().toString(),
            done: false
        }

        // Empty the target value
        event.target.value = "";

        // Add the task object into task list
        addTask(task);
    }
}

function handleClickEvent(event) {

    // Check what is the target
    const target = event.target;
    const targetName = event.target.className;

    console.log("target Name", targetName);

    // If the target is checkbox to toggle
    if (targetName == "custom-checkbox") {
        // Get the taskId
        const taskId = target.id;

        // Do toggle for the task id
        markTaskAsComplete(taskId);
    }
    // If the target is delete do delete task
    else if (targetName == "delete") {
        //Get the task Id
        const taskId = target.dataset.id;

        // Do delete the taskId
        deleteTask(taskId);
    }
}

// Listen key press down event to know the task name
addTaskInput.addEventListener("keydown", handleTaskInput);

// Listen click event to do delete or toggel function using event delegation
document.addEventListener("click", handleClickEvent); 