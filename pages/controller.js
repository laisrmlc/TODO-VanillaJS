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
