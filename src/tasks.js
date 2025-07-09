/* Handles the logic of tasks on the right hand side */
const contentContainer = document.querySelector(".content-container");

function generalSidebarFunctionality() {
    const sidebarButtons = document.querySelectorAll(".general-button, .sidebar-button");

    sidebarButtons.forEach(button => {
        // Sidebar event listener
        button.addEventListener("click", () => {
            const sectionName = button.textContent.replace("✖", "");
            while (contentContainer.firstChild) {
                contentContainer.removeChild(contentContainer.firstChild);
            }

            const contentTitle = document.createElement("h2");
            contentTitle.classList.add("content-title");
            contentTitle.textContent = button.textContent.replace("✖", "");
            contentContainer.appendChild(contentTitle);

            // Retrieves data associated with section name and parse into an object or []
            // For each task, call the addNewTask function to add it again
            const savedTasks = JSON.parse(localStorage.getItem(sectionName)) || [];
            savedTasks.forEach(task => addNewTask(task, sectionName));

            // Add task button on the rightside
            const contentButton = document.createElement("button");
            contentButton.classList.add("content-button");
            contentButton.textContent = "+ Add Task";
            contentContainer.appendChild(contentButton);

            // Add Task event listener
            contentButton.addEventListener("click", () => {
                if (contentContainer.querySelector("form")) return;

                // Form, input, buttons
                const newTaskForm = document.createElement("form");
                contentContainer.appendChild(newTaskForm);

                const newTaskInput = document.createElement("input");
                newTaskInput.classList.add("task-input");
                newTaskInput.placeholder = "Task";
                newTaskForm.appendChild(newTaskInput);
                newTaskInput.focus();

                const buttonsContainer = document.createElement("div");
                buttonsContainer.classList.add("form-buttons");
                newTaskForm.appendChild(buttonsContainer);

                const createButton = document.createElement("button");
                createButton.classList.add("create-button");
                createButton.textContent = "Create";
                createButton.type = "submit";
                buttonsContainer.appendChild(createButton);

                const cancelButton = document.createElement("button");
                cancelButton.classList.add("cancel-button");
                cancelButton.textContent = "Cancel";
                cancelButton.type = "button";
                buttonsContainer.appendChild(cancelButton);

                // On form submit, save to localstorage
                newTaskForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const taskName = newTaskInput.value;
                    if (!taskName) {
                        alert("Task name cannot be empty.");
                    } else {
                        const tasks = JSON.parse(localStorage.getItem(sectionName)) || [];
                        tasks.push({ name: taskName, completed: false });
                        localStorage.setItem(sectionName, JSON.stringify(tasks));

                        addNewTask({ name: taskName, completed: false }, sectionName);
                        newTaskForm.remove();
                    }
                });

                cancelButton.addEventListener("click", () => {
                    newTaskForm.remove();
                });
            });
        });
    });
}

function addNewTask(taskData, sectionName) {
    // Create a task container, move everything on the left-side to the left container
    // Add the left-side container and delete button to the task container
    const newTaskButton = document.querySelector(".content-button");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-item");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("left-task-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;

    checkbox.addEventListener("change", () => {
        const tasks = JSON.parse(localStorage.getItem(sectionName)) || [];
        const updatedTasks = tasks.map(task => {
            if (task.name === taskData.name) {
                return { name: taskData.name, completed: checkbox.checked };
            }
            return task;
        });
        localStorage.setItem(sectionName, JSON.stringify(updatedTasks));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "✖";

    leftContainer.append(checkbox, " ", taskData.name);
    taskContainer.append(leftContainer, deleteBtn);

    deleteBtn.addEventListener("click", () => {
        taskContainer.remove();
        const tasks = JSON.parse(localStorage.getItem(sectionName)) || [];
        const filteredTasks = tasks.filter(task => task.name !== taskData.name);
        localStorage.setItem(sectionName, JSON.stringify(filteredTasks));
    });

    contentContainer.insertBefore(taskContainer, newTaskButton);
}

export { generalSidebarFunctionality }