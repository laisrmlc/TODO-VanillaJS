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