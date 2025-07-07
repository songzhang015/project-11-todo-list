/* Handles the logic of tasks on the right hand side */
const contentContainer = document.querySelector(".content-container");

function generalSidebarFunctionality() {
    const sidebarButtons = document.querySelectorAll(".general-button, .sidebar-button");

    sidebarButtons.forEach(button => {
        // Sidebar event listener
        button.addEventListener("click", () => {
            const sectionName = button.textContent;
            while (contentContainer.firstChild) {
                contentContainer.removeChild(contentContainer.firstChild);
            }

            const contentTitle = document.createElement("h2");
            contentTitle.classList.add("content-title");
            contentTitle.textContent = button.textContent;
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
                newTaskInput.placeholder = "Task";
                newTaskForm.appendChild(newTaskInput);
                newTaskInput.focus();

                const buttonsContainer = document.createElement("div");
                buttonsContainer.classList.add("form-buttons");
                newTaskForm.appendChild(buttonsContainer);

                const createButton = document.createElement("button");
                createButton.textContent = "Create";
                createButton.type = "submit";
                buttonsContainer.appendChild(createButton);

                const cancelButton = document.createElement("button");
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
                        tasks.push(taskName);
                        localStorage.setItem(sectionName, JSON.stringify(tasks));

                        addNewTask(taskName, sectionName);
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

function addNewTask(taskName, sectionName) {
    const newTaskButton = document.querySelector(".content-button");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    taskContainer.append(checkbox, " ", taskName, deleteBtn);

    deleteBtn.addEventListener("click", () => {
        taskContainer.remove();
        const tasks = JSON.parse(localStorage.getItem(sectionName)) || [];
        const filteredTasks = tasks.filter(task => task !== taskName);
        localStorage.setItem(sectionName, JSON.stringify(filteredTasks));
    });

    contentContainer.insertBefore(taskContainer, newTaskButton);

    
}

export { generalSidebarFunctionality }