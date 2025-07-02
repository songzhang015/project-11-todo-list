/* Handles all of the rendering elements of the webpage */

function initializeHeader() {
    const headerContainer = document.querySelector(".header-container");

    // Header
    const titleElement = document.createElement("h1");
    titleElement.classList.add("header-text");
    titleElement.textContent = "Todo List";
    headerContainer.appendChild(titleElement);
}

export { initializeHeader }