// script.js

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('ConcluirExcluir', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar uma tarefa ao DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Concluir';
    completeButton.className = 'complete';
    completeButton.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => {
        li.classList.add('deleting');
        li.addEventListener('animationend', () => {
            taskList.removeChild(li);
            saveTasks();
        });
    };

    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    if (completed) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);

    // Adiciona a classe 'show' após um pequeno atraso para a animação
    setTimeout(() => {
        li.classList.add('show');
    }, 10);
}

// Função para adicionar uma nova tarefa
function addTask() {
    if (taskInput.value.trim() !== '') {
        addTaskToDOM(taskInput.value);
        saveTasks();
        taskInput.value = '';
    }
}

// Adiciona eventos para adicionar tarefas
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carrega as tarefas ao carregar a página
loadTasks();
