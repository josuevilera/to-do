// Selección de elementos HTML
const inputTask = document.querySelector('.input-task');
const toDoList = document.querySelector('.toDo-list');
const itemsLeft = document.querySelector('.items-left');
const clearCompleted = document.querySelector('.clear-completed');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');

// Variables para manejar tareas
let tasks = [];
let filter = 'all';

// Función para actualizar el contador de tareas pendientes
function updateItemsLeft() {
    const itemsLeftCount = tasks.filter(task => !task.completed).length;
    itemsLeft.textContent = `${itemsLeftCount} items left`;
}

// Función para renderizar tareas en la lista
function renderTasks() {
    toDoList.innerHTML = ''; // Limpiar la lista

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
    return true;
});

  // Agregar cada tarea al DOM
filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement('article');
    taskElement.className = 'bg-white w-full px-4 py-2 text-slate-600 flex items-center';
    taskElement.classList.add(index === 0 ? 'rounded-t' : '', index === tasks.length - 1 ? 'rounded-b' : '');

    // Botón de completar tarea
    const completeButton = document.createElement('button');
    completeButton.className = 'relative top-1 mr-2 hover:transform hover:scale-125 transition-transform';
    completeButton.innerHTML = `<span class="material-symbols-outlined text-purple-400">${
        task.completed ? 'check_circle' : 'radio_button_unchecked'
    }</span>`;
    completeButton.addEventListener('click', () => toggleTaskCompletion(index));
    taskElement.appendChild(completeButton);

    // Texto de la tarea
    const taskText = document.createElement('span');
    taskText.className = 'text-sm mr-auto';
    if (task.completed) taskText.classList.add('line-through', 'text-slate-400');
    taskText.textContent = task.text;
    taskElement.appendChild(taskText);

    // Botón de eliminar tarea
    const deleteButton = document.createElement('span');
    deleteButton.className = 'material-symbols-outlined cursor-pointer hover:transform hover:scale-125 transition-transform';
    deleteButton.textContent = 'close';
    deleteButton.addEventListener('click', () => deleteTask(index));
    taskElement.appendChild(deleteButton);

    toDoList.appendChild(taskElement);
});

    updateItemsLeft();
}

// Función para agregar una nueva tarea
function addTask(text) {
    if (text.trim()) {
        tasks.push({ text, completed: false });
        inputTask.value = '';
        renderTasks();
    }
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Función para cambiar el estado de completado de una tarea
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Función para limpiar tareas completadas
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

// Funciones de filtro
function setFilter(newFilter) {
    filter = newFilter;
    renderTasks();
}

// Event Listeners
inputTask.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTask(inputTask.value);
    }
});

clearCompleted.addEventListener('click', clearCompletedTasks);
filterAll.addEventListener('click', () => setFilter('all'));
filterActive.addEventListener('click', () => setFilter('active'));
filterCompleted.addEventListener('click', () => setFilter('completed'));

// Renderizar la lista inicial
renderTasks();
