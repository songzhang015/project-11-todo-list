/* Handles the logic of projects section in the webpage */

import { shiftFocus } from "./render"
import { generalSidebarFunctionality } from "./tasks"

const sidebarContainer = document.querySelector(".sidebar-container")

function addProjectFunctionality() {

    const newProjectButton = document.querySelector(".add-project-button");

    newProjectButton.addEventListener("click", () => {
        if (sidebarContainer.querySelector("form")) {
            return;
        }

        const newProjectForm = document.createElement("form");
        sidebarContainer.appendChild(newProjectForm);

        // Project Input
        const newProjectInput = document.createElement("input");
        newProjectForm.appendChild(newProjectInput);
        newProjectInput.placeholder = "Project Name";

        // Buttons Container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("form-buttons");
        newProjectForm.appendChild(buttonsContainer);

        // Create Button
        const createProjectButton = document.createElement("button");
        createProjectButton.textContent = "Create";
        createProjectButton.type = "submit";
        buttonsContainer.appendChild(createProjectButton);

        // Cancel Button
        const cancelProjectButton = document.createElement("button");
        cancelProjectButton.textContent = "Cancel";
        cancelProjectButton.type = "button";
        buttonsContainer.appendChild(cancelProjectButton);

        // Form and button functionality
        newProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        newProjectForm.addEventListener("submit", (e) => {
            const projectName = newProjectInput.value;
            if (!projectName) {
                alert("Project name cannot be empty.");
            } else if (projectExists(projectName)) {
                alert("Project names must be different.");
            } else {
                newProject(projectName);
                newProjectForm.remove();
            }
        });

        cancelProjectButton.addEventListener("click", () => {
            newProjectForm.remove();
        });
    });
}

function newProject(projectName) {
    const newProjectButton = document.querySelector(".add-project-button");
    const newProject = document.createElement("button");
    newProject.classList.add("sidebar-button");
    newProject.textContent = projectName;
    sidebarContainer.insertBefore(newProject, newProjectButton);
    shiftFocus();
    generalSidebarFunctionality();
}

function projectExists(projectName) {
    const projects = sidebarContainer.querySelectorAll(".sidebar-button");
    const name = projectName.toLowerCase();
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].textContent.toLowerCase() === name) {
            return true;
        }
    }
    return false;
}

export { addProjectFunctionality }