/* JS File for Todo List Project */
import "./styles.css";
import { initializeHeader, initializeSidebar } from "./render"
import { addProjectFunctionality } from "./projects"
import { generalSidebarFunctionality } from "./tasks";

initializeHeader();
initializeSidebar();
addProjectFunctionality();
generalSidebarFunctionality();
