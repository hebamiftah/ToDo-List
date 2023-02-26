// Data Input Variables
let taskInput = document.querySelector('.taskInput') // Input field for the task
let priorityInput = document.querySelector('.colorPriority') // Input field for the priority
let dateInput = document.querySelector('.dateInput') // Input field for the date

// Button Variables
let addTaskBtn = document.querySelector('.btnAdd') // Button to add a task
let clearTaskBtn = document.querySelector('.clearAll') // Button to clear all tasks

// Container Variables
let allTaskContainer = document.querySelector('.allTasks')
let sideTaskContainer = document.querySelector('.mainTasksList')
let completedTaskContainer = document.querySelector('.tasksCont')
// MainTain a List of a Tasks with name, date and piroirty color
let taskList = [] // List of all the tasks

// Notifications
const notification = document.querySelector('.notification')
const notificationContainer = document.querySelector('.notification-container')
let noTask = document.querySelector('.noTask')
let noTaskT = document.querySelector('.noTaskT')

// Show notifications
function showNotification(message, backgroundColor, foreGroundColor) {
  notificationContainer.style.display = 'block'
  notification.style.backgroundColor = backgroundColor
  notification.style.color = foreGroundColor
  notification.innerHTML = message
  setTimeout(function () {
    notificationContainer.style.display = 'none'
  }, 2000)
}

/*
    Check the priority of the task
    and return the color code
*/
const checkPriority = function (priority) {
  if (priority === 'low') {
    return '#00cc00'
  } else if (priority === 'medium') {
    return '#ffff00'
  } else if (priority === 'high') {
    return '#e62e00'
  } else {
    return '#0000cc'
  }
}

/*
    Function to convert a Date using format yyyy-mm-dd.
*/
const convertDateToStr = function (date) {
  // Array of months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Get the year, month and day from the date
  const year = Number(date.slice(0, 4))
  const month = Number(date.slice(5, 7))
  const day = Number(date.slice(8, 11))

  // Make String from this Date
  let dateString = `${months[month - 1] + ' ' + day + ', ' + year}`
  return dateString
}

// function for adding tasks on the Page
const renderTask = function () {
  let task = taskList[taskList.length - 1]
  let eachTask = `<!-- Task -->
    <div class="eachTask" id = "${task.id}">
      <div class="left">
        <!-- Bullet Point -->
        <div class="priorityColor" style = "background-color:${task.priorityColor}"></div>
        <p class="text">${task.name}</p>
      </div>
      <div class="right">
        <p class = "date">${task.date}</p>
        <div class="icons">
          <button class = "checkBtn"><i class="fa-regular fa-circle-check"></i></button>
          <button class="unCheckBtn"><i class="fa-regular fa-circle"></i></button>
          <button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>    
    </div>`

  let sideBarTask = ` 
    <li>
      <div class="color" style = "background-color:${task.priorityColor}"></div>
      <p class="text">${task.name}</p>
    </li>
    `
  // check if no tasks are present
  if (taskList.length > 0) {
    noTask.style.display = 'none'
    noTaskT.style.display = 'none'
    // add the task to the main container
    completedTaskContainer.innerHTML += eachTask
    // add the task to the sideBar
    sideTaskContainer.innerHTML += sideBarTask

    // add event listeners to the buttons
    let deleteBtn = document.querySelectorAll('.deleteBtn')
    let checkBtn = document.querySelectorAll('.checkBtn')
    let unCheckBtn = document.querySelectorAll('.unCheckBtn')
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', deleteATask)
    })
    checkBtn.forEach((btn) => {
      btn.addEventListener('click', checkATask)
    })
    unCheckBtn.forEach((btn) => {
      btn.addEventListener('click', unCheckATask)
    })
  } else {
    // if tasks are present then hide the no tasks block
    noTask.style.display = 'block'
  }
}
// function for adding a task into the List
const addTask = function addTask() {
  // Check if the input fields are empty
  if (
    taskInput.value === '' ||
    priorityInput.value === '' ||
    dateInput.value === ''
  ) {
    showNotification('Please fill all the fields', '#ff4d4d', 'white')
    return
  }

  // else we will add the task to the List
  let name = taskInput.value
  let priorityColor = checkPriority(priorityInput.value)
  let date = convertDateToStr(dateInput.value)

  // Create a Task
  let task = {
    name,
    priorityColor,
    date,
    id: taskList.length + 1,
  }
  taskList.push(task)
  // calling the renderTask function
  renderTask()
  showNotification('Task Added', '#00cc00', 'white')
  // clear the input fields
  taskInput.value = ''
  priorityInput.value = ''
  dateInput.value = ''
}

/* Function to Clear the list of tasks */
const clearTask = function () {
  // clear the task list
  taskList = []
  // clear the main container
  completedTaskContainer.innerHTML = ''
  // clear the sideBar
  sideTaskContainer.innerHTML = ''
  // show the no tasks block
  noTask.style.display = 'block'
  noTaskT.style.display = 'block'
  showNotification('All Tasks Cleared', '#00cc00', 'white')
}

// function to check a task
const checkATask = function (e) {
  // add checkmark to task when user clicks on it
  let checkBtn = e.target.parentElement
  let unCheckBtn = e.target.parentElement.nextElementSibling
  checkBtn.style.display = 'none'
  unCheckBtn.style.display = 'block'
  showNotification('Task UnChecked  ', '#ff4d4d', 'white')
}

const unCheckATask = function (e) {
  // removes checkmark from task when user clicks on it
  let checkBtn = e.target.parentElement.previousElementSibling
  let unCheckBtn = e.target.parentElement
  checkBtn.style.display = 'block'
  unCheckBtn.style.display = 'none'
  showNotification('Task Checked', '#00cc00', 'white')
}

// function to uncheck a task
// render sidebar tasks
const renderSideBarTasks = function () {
  // add sidebar tasks iteration over whole array
  sideTaskContainer.innerHTML = ''
  taskList.forEach(function (task) {
    let sideBarTask = `
    <li>
        <div class="color" style = "background-color:${task.priorityColor}"></div>
        <p class="text">${task.name}</p>
    </li>
    `
    sideTaskContainer.innerHTML += sideBarTask
  })
  if (taskList.length === 0) {
    noTaskT.style.display = 'block'
  } else {
    noTaskT.style.display = 'none'
  }
}

const deleteATask = function (e) {
  // get the id of the task to be deleted
  let id = e.target.parentElement.parentElement.parentElement.parentElement.id
  // remove the task from the list
  taskList = taskList.filter(function (task) {
    console.log(task.id, id)
    return task.id != id
  })
  // remove the task from the main container
  e.target.parentElement.parentElement.parentElement.parentElement.remove()
  // remove the task from the sideBar
  e.target.parentElement.parentElement.parentElement.parentElement.remove()
  // check if no tasks are present
  if (taskList.length === 0) {
    // if tasks are not present then dipslay the no tasks message
    noTask.style.display = 'block'
    noTaskT.style.display = 'block'
  }
  renderSideBarTasks()
  showNotification('Task Deleted', '#ff4d4d', 'white')
}

// Event Handler
addTaskBtn.addEventListener('click', addTask)
clearTaskBtn.addEventListener('click', clearTask)
