document.addEventListener("DOMContentLoaded", function() {
    // Retrieve tasks from localStorage on page load
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks from localStorage
    renderTasks(tasks);

    function renderTasks(tasks) {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear existing tasks

        tasks.forEach(function(taskText) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(taskText));
            taskList.appendChild(li);

            // Add event listener for task completion
            li.addEventListener("click", function() {
                this.classList.toggle("completed");
                updateLocalStorage();
            });

            // Add button for task removal
            var removeButton = document.createElement("button");
            removeButton.appendChild(document.createTextNode("Remove"));
            li.appendChild(removeButton);

            // Add event listener for task removal
            removeButton.addEventListener("click", function() {
                li.remove();
                updateLocalStorage();
            });
        });
    }

    function addTask() {
        var taskInput = document.getElementById("taskInput");
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        if (taskInput.value !== "") {
            tasks.push(taskInput.value);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks(tasks);
            taskInput.value = "";
        }
    }

    function updateLocalStorage() {
        var tasks = [];
        var taskElements = document.querySelectorAll("#taskList li");

        taskElements.forEach(function(taskElement) {
            tasks.push(taskElement.innerText);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener for "Add Task" button
    var addButton = document.querySelector("button");
    addButton.addEventListener("click", addTask);
});
