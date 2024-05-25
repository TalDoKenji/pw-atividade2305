const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const buttonEdit = document.createElement('button')
  buttonEdit.textContent = '✏️'


  const li = document.createElement('li')

  li.id = taskId
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button onclick="editTask(event)">✏️</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const task = { id: taskId, title: taskTitle, description: taskDescription }
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push(task)
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function editTask(event) {
  console.log(event)

  document.querySelector('#dialog').showModal()

  let title = document.querySelector('#title-dialog')
  title.value = event.target.parentElement.children[0].textContent

  let description = document.querySelector('#description-dialog')
  description.value = event.target.parentElement.children[1].textContent

}


// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li>
    <h2>${task.title}</h2>
    <p>${task.description}</p>
    <button onclick="editTask(event)">✏️</button>
    </li>`)
    .join('')


})