(function () {
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    function renderList() {
        // Remove all the tasks from the list in user interface
        taskList.innerHTML = "";

        // Add the updated tasks to the user interface
        for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
            addTaskToDOM(tasks[taskIndex]);
        }
    }

    function addTaskToDOM(task) {

        // Create a list element in DOM
        const listElement = document.createElement("li");

        // Update the list element with the list template with values of task object
        listElement.innerHTML =
            `<input type="checkbox" id=${task.id} ${task.completed ? "checked" : ""}  class="custom-checkbox">
        <label for= ${task.id}> ${task.title}</label>
        <img src="Images/Delete_image.png" class="delete" data-id= ${task.id} />`;

        // Append the task element to the task list
        taskList.append(listElement);
    }

    function markTaskAsComplete(taskId) {

        // Reterive the particular task id
        let requestedTask = tasks.filter((task) => {
            if (Number(task.id) == Number(taskId)) {
                return task;
            }
        })

        // Check if the task is available
        if (requestedTask.length > 0) {
            // Mark tha particular task as completed
            let task = requestedTask[0];
            task.completed = !task.completed;

            // Render list
            renderList();

            // Show notification
            showNotification("Task status changed successfully!!");
        }
        else {
            // Show notification
            showNotification("Task not found");
        }
    }

    function deleteTask(taskId) {

        // Remove the task with taskId from the task list
        let updatedTasks = tasks.filter((task) => {
            if (Number(task.id) != Number(taskId)) {
                return task;
            }
        })
        tasks = updatedTasks;

        // Show notification
        showNotification("Task deleted successfully!!");

        // Render the new task list in user interface
        renderList();

        // Update the count
        decrementTaskCount();
    }

    function addTask(task) {
        //Add the task into the list
        tasks.push(task);

        // Show notification
        showNotification("Task added successfully!!");

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
                title: taskMessage,
                id: Date.now().toString(),
                completed: false
            }

            // Add the task object into task list
            addTask(task);
        }
    }

    function handleClickEvent(event) {

        // Check what is the target
        const target = event.target;
        const targetName = event.target.className;

        // If the target is checkbox to toggle
        console.log(event.target);
        if (targetName == "custom-checkbox") {
            // Get the taskId
            const taskId = Number(target.id);

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

    function fetchData() {
        // Execute the fetch API call
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(function (responses) {
                return responses.json();
            })
            .then(function (datas) {
                // Get only first 10 jsons
                tasks = datas.slice(0, 10);

                // Render the list with 10 jsons
                renderList();

                // Increment the count to 10
                for (let i = 0; i < 10; i++) {
                    incrementTaskCount();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function initialiseApplication() {
        //Fetch tasks from external API
        fetchData();

        // Listen key press down event to know the task name
        addTaskInput.addEventListener("keydown", handleTaskInput);

        // Listen click event to do delete or toggel function using event delegation
        document.addEventListener("click", handleClickEvent);
    }

    initialiseApplication();


})();