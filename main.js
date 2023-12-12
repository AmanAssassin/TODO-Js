// Select DOM elements
const taskList = document.querySelector(".todo-container");
const addTaskInput = document.querySelector("input");
const remainingTasks = document.getElementById("tasksLeft");
const allTask = document.querySelector(".all-todo");
const uncompleteTask = document.querySelector(".uncomplete-todo");
const compeltedTask = document.querySelector(".completed-todo");
const clearCompleted = document.querySelector(".clear-todo");

// Load tasks from local storage
let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];



// Render initial task list
renderList();




// Add task to DOM
function addTaskToDom(task) {
  // Create a div element for the task
  const todo = document.createElement("div");
  todo.setAttribute("class", "todos");

  // Add the task HTML
  todo.innerHTML = `
  <div class="toggle-check ${task.Completed ? 'check-active' : ''}">
    <img src="/assets/tick-icon.svg" class="toggle" alt="tic" data-id="${task.Id}" ${task.Completed ? "Checked" : ""}>
  </div>
  <div class="todo-name-box">
    <span class="todo-name ${task.Completed ? 'complete' : ''}" data-id="${task.Id}">${task.text}</span>
  </div>
  <div class="deletebox">
    <img src="/assets/delete-icon.svg" alt="icon" class="delete" id="delete-icon" data-id="${task.Id}">
  </div>
  <img src="/assets/tick-icon.svg" class="tick-icon" alt="tick" style="display: ${task.Completed ? 'inline' : 'none'}; fill: black">
`;



  // Add the task to the task list
  taskList.appendChild(todo);

  // Execute event listener for task completion toggle
  toggleCheckTask(todo, task);
}





// Toggle task completion function
// function toggleCheckTask(todo, task) {
//   const toggleCheck = todo.querySelector(".toggle-check");
//   const toggleName = todo.querySelector(".todo-name");

//   // Add click event listener to the toggle check
//   toggleCheck.addEventListener("click", (e) => {
//     // Toggle the completion state
//     task.Completed = !task.Completed;

//     // Update the task completion display
//     toggleCheck.classList.toggle("check-active");
//     toggleName.classList.toggle("complete");

//     // Update local storage
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     let taskIndex = tasks.findIndex(t => t.Id === task.Id);
//     tasks[taskIndex].Completed = task.Completed;
//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     // Update the task tasksLeft
//     taskLeft();
//     showNotification("Task Toggle Successfully");
//   });
// }
function toggleCheckTask(todo, task) {
  const toggleCheck = todo.querySelector(".toggle-check");
  const tickIcon = todo.querySelector(".tick-icon");

  toggleCheck.addEventListener("click", () => {
    task.Completed = !task.Completed;

    if (task.Completed) {
      // If task is completed, set the color of the background to green and leave the tick icon black
      todo.style.backgroundColor = "lightgreen";
    } else {
      // If task is not completed, reset the color of the background
      todo.style.backgroundColor = "";
    }

    toggleCheck.classList.toggle("check-active");
    updateLocalStorage();
    taskLeft();
    showNotification("Task Toggle Successfully");
  });
}



// Render the list of tasks
function renderList() {
  taskList.innerHTML = "";

  // Add each task to the DOM
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }

  // Update the task tasksLeft
  taskLeft();
}




// Delete a task
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.Id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderList();
    showNotification("Task Deleted Successfully");
  } else {
    showNotification("Task not found");
  }
}





// Add a task to the list
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Tasks Added Succefully");
    return;
  }

  showNotification("Tasks Can Not Be Added");
}

// Show a notification message
// function showNotification(text) {
//   alert(text);
// }





// Define a function to handle keypress events
function handleInputKeypress(e) {

  // If the key pressed is the Enter key (keyCode 13)
  if (e.keyCode === 13) {
    // Get the text value from the input element
    const text = e.target.value;

    // If the text value is empty
    if (!text) {
      // Show a notification and return (i.e. do not create a new task)
      showNotification("Test Text Can Not Be Empty");
      return;
    }

    // Create a new task object with the text value, a unique Id based on the current timestamp, and a default Completed value of false
    const task = {
      text,
      Id: Date.now().toString(),
      Completed: false,
    };

    // Clear the input element's value
    e.target.value = "";

    // Add the new task using the addTask function
    addTask(task);
  }
}





// Define a function to show all tasks in the DOM
function showAllTasks() {

  // Clear the contents of the HTML element with the id "taskList"
  taskList.innerHTML = "";

  // Iterate over the tasks array using a for loop
  for (let i = 0; i < tasks.length; i++) {

    // Call the addTaskToDom function for each task to add it to the DOM
    addTaskToDom(tasks[i]);
  }
}





// Define a function to display all uncompleted tasks in the DOM
function displayUncompletedTasks() {

  // Clear the contents of the HTML element with the id "taskList"
  taskList.innerHTML = "";

  // Filter the tasks array to get all uncompleted tasks
  const uncompletedTasks = tasks.filter((task) => !task.Completed);

  // Iterate over the uncompleted tasks using a for loop
  for (let i = 0; i < uncompletedTasks.length; i++) {

    // Call the addTaskToDom function for each uncompleted task to add it to the DOM
    addTaskToDom(uncompletedTasks[i]);
  }
}






// Define a function to display all completed tasks in the DOM
function completedTasks() {

  // Clear the contents of the HTML element with the id "taskList"
  taskList.innerHTML = "";

  // Filter the tasks array to get all completed tasks
  const completedTask = tasks.filter((task) => task.Completed);

  // Iterate over the completed tasks using a for loop
  for (let i = 0; i < completedTask.length; i++) {

    // Call the addTaskToDom function for each completed task to add it to the DOM
    addTaskToDom(completedTask[i]);
  }
}







// Define a function to delete all completed tasks from the tasks array
function deleteCompletedTasks() {

  // Use the Array filter method to create a new array with only uncompleted tasks
  tasks = tasks.filter((task) => !task.Completed);

  // Call the renderList function to display the remaining tasks in the DOM
  renderList();

  // Display a notification to confirm that completed tasks were deleted successfully
  showNotification("Completed Tasks Deleted Successfully");
}






// Define a function to count the number of incomplete tasks
function taskLeft() {

  // Use the Array filter method to create a new array with only uncompleted tasks
  const uncompletedTasks = tasks.filter(task => !task.Completed);

  // Get the length of the uncompleted tasks array to get the number of tasks left
  const tasksLeft = uncompletedTasks.length;

  // Update the remainingTasks element with the number of tasks left
  remainingTasks.textContent = tasksLeft;

  // Store the tasks array in local storage as a JSON string
  localStorage.setItem("tasks", JSON.stringify(tasks));
}






// Define a function to handle click events
function handleClickListener(e) {

  // Get the target element that was clicked
  const target = e.target;

  // Check if the target element has the "delete" class
  if (target.classList.contains("delete")) {
    // If it does, get the task ID from the "data-id" attribute and delete the task
    const taskId = target.dataset.id;
    deleteTask(taskId);
  }

  // Check if the target element has the "uncomplete-todo" class
  if (target.classList.contains("uncomplete-todo")) {
    // If it does, display only uncompleted tasks and update the class names of the task filters
    displayUncompletedTasks();
    uncompleteTask.classList.add("active");
    allTask.classList.remove("active");
    compeltedTask.classList.remove("active");
    clearCompleted.classList.remove("active");
  }

  // Check if the target element has the "all-todo" class
  if (target.classList.contains("all-todo")) {
    // If it does, show all tasks and update the class names of the task filters
    showAllTasks();
    allTask.classList.add("active")
    uncompleteTask.classList.remove("active");
    compeltedTask.classList.remove("active");
    clearCompleted.classList.remove("active");
  }

  // Check if the target element has the "completed-todo" class
  if (target.classList.contains("completed-todo")) {
    // If it does, display only completed tasks and update the class names of the task filters
    completedTasks();
    compeltedTask.classList.add("active")
    allTask.classList.remove("active");
    uncompleteTask.classList.remove("active");
    clearCompleted.classList.remove("active");
  }

  // Check if the target element has the "clear-todo" class
  if (target.classList.contains("clear-todo")) {
    // If it does, delete all completed tasks and update the class names of the task filters
    deleteCompletedTasks();
    clearCompleted.classList.add("active");
    allTask.classList.remove("active");
    uncompleteTask.classList.remove("active");
    compeltedTask.classList.remove("active");
  }
}





function initializeTheCode() {
  // add event listener to input for handling keyup events
  addTaskInput.addEventListener("keyup", handleInputKeypress);

  // add event listener to document for handling click events
  document.addEventListener("click", handleClickListener);
}




// call the initialize function to set up event listeners
initializeTheCode();