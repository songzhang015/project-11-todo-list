/* Handles all interactions with localStorage */

function getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function getTasks(sectionName) {
    return JSON.parse(localStorage.getItem(sectionName)) || [];
}

function saveTasks(sectionName, tasks) {
    localStorage.setItem(sectionName, JSON.stringify(tasks));
}

function removeProjectTasks(projectName) {
    localStorage.removeItem(projectName);
}

export {
    getProjects,
    saveProjects,
    getTasks,
    saveTasks,
    removeProjectTasks
}