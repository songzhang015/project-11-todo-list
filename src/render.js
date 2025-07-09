/* Handles the rendering of elements in the webpage */

function initializeHeader() {
    const headerContainer = document.querySelector(".header-container");
    const titleElement = document.createElement("h1");
    titleElement.classList.add("header-text");
    titleElement.textContent = "Todo List";
    headerContainer.appendChild(titleElement);
}

function initializeSidebar() {
    const sidebarContainer = document.querySelector(".sidebar-container");

    // General
    const generalTitle = document.createElement("h2");
    generalTitle.classList.add("sidebar-title");
    generalTitle.textContent = "General";
    sidebarContainer.appendChild(generalTitle);

    const todayButton = document.createElement("button");
    todayButton.classList.add("sidebar-button");
    todayButton.classList.add("general-button");
    todayButton.textContent = "Today";
    sidebarContainer.appendChild(todayButton);

    const weeklyButton = document.createElement("button");
    weeklyButton.classList.add("sidebar-button");
    weeklyButton.classList.add("general-button");
    weeklyButton.textContent = "Weekly";
    sidebarContainer.appendChild(weeklyButton);

    const monthlyButton = document.createElement("button");
    monthlyButton.classList.add("sidebar-button");
    monthlyButton.classList.add("general-button");
    monthlyButton.textContent = "Monthly";
    sidebarContainer.appendChild(monthlyButton);

    // Projects
    const projectsTitle = document.createElement("h2");
    projectsTitle.classList.add("sidebar-title");
    projectsTitle.textContent = "Projects";
    sidebarContainer.appendChild(projectsTitle);

    // Shift focus when button clicked
    shiftFocus();

    // Adding Projects
    const newProjectButton = document.createElement("button");
    newProjectButton.classList.add("add-project-button");
    newProjectButton.textContent = "+ New Project";
    sidebarContainer.appendChild(newProjectButton);
}

function shiftFocus() {
    const sidebarButtons = document.querySelectorAll(".sidebar-button");
    sidebarButtons.forEach(button => {
        button.addEventListener("click", () => {
            sidebarButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}

export { initializeHeader, initializeSidebar, shiftFocus }