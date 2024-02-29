// To prevent typos when comparing task status
const completed = 'completed'
const uncompleted = 'uncompleted'

const checkedIconProps = {
  paths: [
    'M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z',
    'M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z'
  ],
  classes: 'bi bi-check-square'
}

const uncheckedIconProps = {
  paths: [
    'M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'
  ],
  classes: 'bi bi-square'
}

const deleteIconProps = {
  paths: ['M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5'],
  classes: 'bi bi-trash3'
}

function renderIcon(node, paths, iconClass) {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  iconSvg.setAttribute('fill', 'currentColor')
  iconSvg.setAttribute('viewBox', '0 0 16 16')
  iconSvg.setAttribute('width', '16')
  iconSvg.setAttribute('height', '16')
  iconSvg.setAttribute('class', iconClass)

  paths.forEach(path => {
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )

    iconPath.setAttribute(
      'd',
      path
    )
    iconSvg.appendChild(iconPath)
  })

  return node.appendChild(iconSvg)
}


// Page data
// If it is a list, it would have a data with an array
model = {
  tasks: [],
  errorMessage: '',

  getTasks: function () {
    return this.tasks
  },

  getErrorMessage: function () {
    return this.errorMessage
  },

  setErrorMessage: function (value) {
    this.errorMessage = value
  },

  addTask: function(taskToBeAdded) {
    if (this.tasks.find(item => item.name === taskToBeAdded)) {
      model.setErrorMessage('There can be no duplicated tasks')
    } else if (!taskToBeAdded) {
      model.setErrorMessage('There can be no empty task')
    } else {
      model.setErrorMessage('')
      
      this.tasks.push(taskToBeAdded)
    }
  },

  deleteTask: function(taskToBeDeleted) {
    if (taskToBeDeleted) {
      this.tasks = this.tasks.filter(item => item.name !== taskToBeDeleted)
    }
  },

  updateStatus: function(taskToBeUpdated) {
    const currentTaskStatus = this.tasks.find(task => task.name === taskToBeUpdated).status
    const newStatus = currentTaskStatus === completed ? uncompleted : completed

    const indexOfTask = this.tasks.findIndex(item => item.name === taskToBeUpdated)
    const updatedTasks = [...this.tasks]

    updatedTasks[indexOfTask] = { name: taskToBeUpdated, status: newStatus}

    if (taskToBeUpdated) {
      this.tasks = updatedTasks
    }
  }
}

// What would be render (what you can see)
view = {
  renderList: function(tasks) {
    const todoList = document.getElementById('todo-list')
    const errorMessage = document.getElementById('error-message')
    const input = document.getElementById('add-input')

    // Display error message
    if (model.getErrorMessage()) {
      errorMessage.textContent = model.getErrorMessage()

      return errorMessage.style.display = 'flex';
    } else {
      errorMessage.style.display = 'none';
    }

    // Clean list to render a new one
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild)
    }

    // Clean input value
    input.value = ''

    tasks.forEach(task => {
      const taskToRender = document.createElement('li')
      const buttonWrapper = document.createElement('div')
      buttonWrapper.setAttribute('class', 'buttons-wrapper')

      // New task to be added
      taskToRender.textContent = task.name
      taskToRender.className = task.status === completed ? completed : ''
      
      // Button to check if the task was done
      const checkTaskButton = document.createElement('button')
      renderIcon(checkTaskButton, uncheckedIconProps.paths, uncheckedIconProps.classes)
      checkTaskButton.classList.add('button-check')

      // Check button event listener
      checkTaskButton.addEventListener('click', function() {
        controller.clickOnTask(task.name)
      })

      // Check which icon should be display (checked or unchecked)
      if (task.status === completed) {
        taskToRender.classList.add('completed-task')
        checkTaskButton.removeChild(checkTaskButton.firstChild)
        renderIcon(checkTaskButton, checkedIconProps.paths, checkedIconProps.classList)
      } else {
        checkTaskButton.removeChild(checkTaskButton.firstChild)
        renderIcon(checkTaskButton, uncheckedIconProps.paths, uncheckedIconProps.classes)
      }

      // Group of delete and check button
      buttonWrapper.appendChild(checkTaskButton)

      // Delete button
      const deleteButton = document.createElement('button')
      renderIcon(deleteButton, deleteIconProps.paths, deleteIconProps.classes)
      deleteButton.classList.add('button-delete')

      // Delete button event listener
      deleteButton.addEventListener('click', function() {
        controller.deleteTask(task.name)
      })

      // Group of delete and check button
      buttonWrapper.appendChild(deleteButton)

      // List element
      taskToRender.appendChild(buttonWrapper)

      todoList.appendChild(taskToRender)
    })
  },
}

// Controls every action in the page
controller = {
  init: function() {
    view.renderList()
  },

  clearList: function() {
    model.tasks = []

    view.renderList(tasks)
  },

  addTask: function() {
    const newTaskContent = document.getElementById('add-input').value
    
    model.addTask({ name: newTaskContent, status: uncompleted })

    const tasks = model.getTasks()
    view.renderList(tasks)
  },

  deleteTask: function(taskName) {
    model.deleteTask(taskName)

    const tasks = model.getTasks()

    view.renderList(tasks)
  },

  clickOnTask: function(taskName) {
    model.updateStatus(taskName)

    const tasks = model.getTasks()

    view.renderList(tasks)
  }
}
