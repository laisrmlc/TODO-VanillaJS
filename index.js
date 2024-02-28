// To prevent typos when comparing task status
const completed = 'completed'
const uncompleted = 'uncompleted'
const uncheckedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
</svg>`
const checkedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
<path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>`
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`

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
    if (taskToBeAdded) {
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
    todoList.innerHTML = ''
    input.value = ''

    tasks.forEach(task => {
      const taskToRender = document.createElement('li')
      const buttonWrapper = document.createElement('div')
      buttonWrapper.setAttribute('class', 'buttons-wrapper')

      taskToRender.textContent = task.name
      taskToRender.className = task.status === completed ? completed : ''
      
      const checkTaskButton = document.createElement('button')      
      checkTaskButton.innerHTML = uncheckedIcon
      checkTaskButton.setAttribute('class', 'button-check')

      checkTaskButton.addEventListener('click', function() {
        controller.clickOnTask(task.name)
      })

      if (task.status === completed) {
        // Set SVG markup for checked checkbox
        checkTaskButton.innerHTML = checkedIcon
        taskToRender.classList.add('completed-task')
      } else {
        // Set SVG markup for unchecked checkbox
        checkTaskButton.innerHTML = uncheckedIcon
        taskToRender.classList.remove('completed-task')
      }

      buttonWrapper.appendChild(checkTaskButton)

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = deleteIcon
      deleteButton.setAttribute('class', 'button-delete')

      deleteButton.addEventListener('click', function() {
        controller.deleteTask(task.name)
      })

      buttonWrapper.appendChild(deleteButton)

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
    const tasks = model.getTasks()

    if (tasks.find(item => item.name === newTaskContent)) {
      model.setErrorMessage('There can be no duplicated tasks')
    } else if (!newTaskContent) {
      model.setErrorMessage('There can be no empty task')
    } else {
      model.setErrorMessage('')
      model.addTask({ name: newTaskContent, status: uncompleted })
    }

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
