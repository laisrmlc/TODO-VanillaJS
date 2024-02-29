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
      checkTaskButton.classList.add('custom-button')
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
      deleteButton.classList.add('custom-button')

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