import { nanoid } from 'nanoid';

import './styles/style.css';

const $toDoList = document.querySelector('.toDo-list') as HTMLElement;
const $inputTask = document.querySelector('.input-task') as HTMLInputElement;
const $clearCompleted = document.querySelector('.clear-completed') as HTMLButtonElement;

type ToDo = {
  id: string;
  task: string;
  isCompleted: boolean;
}

const allToDos: ToDo[] = [
  {
    id: nanoid(6),
    task: 'Pasear a las perras',
    isCompleted: false
  },
  {
    id: nanoid(6),
    task: 'Leer un libro',
    isCompleted: true
  }
];

function deleteToDo (idDelete: string) {

  for (const i in allToDos) {
    console.log(i);
    

    if (allToDos[i].id === idDelete) {
      allToDos.splice(Number(i), 1);
    }

    printToDos();
  }
  
  updateItemsLeft();
}

function completeUncompletetoDo (idComplete: string) {
  
  for (const toDo of allToDos) {
    if (toDo.id === idComplete) {
      toDo.isCompleted = !toDo.isCompleted;
    }
  }

  printToDos();
  updateItemsLeft();
  
}

function updateItemsLeft () {
  const $itemsLeft = document.querySelector('.items-left') as HTMLSpanElement;

  let total = 0;
  for (const toDo of allToDos) {
    if (!toDo.isCompleted) total++;
  }

  $itemsLeft.innerText = String(total);
}

function createToDo (toDo: ToDo) {
  const $article = document.createElement('article');
    $article.className = 'bg-white w-full px-4 py-2  text-slate-600 flex items-center rounded-t';
  
    const checkIcon = toDo.isCompleted ? 'check_circle' : 'radio_button_unchecked';
    const checkClasses = toDo.isCompleted ? 'line-through text-slate-400' : '';
  
    $article.innerHTML = `
      <button class="check-button relative top-1 mr-2 hover:transform hover:scale-125 transition-transform">
        <span class="material-symbols-outlined text-purple-400">${checkIcon}</span>
      </button>
      <span class="text-sm mr-auto ${checkClasses}">${toDo.task}</span>
      <span class="delete-button material-symbols-outlined cursor-pointer hover:transform hover:scale-125 transition-transform">close</span>
    `;


    // Solución 1: Cazar los botones JUSTO DESPUÉS DE CREARLOS!
    const $btnDelete = $article.querySelector('.delete-button') as HTMLSpanElement;
    $btnDelete.addEventListener('click', () => deleteToDo(toDo.id)) // 0x123
    
    const $btnCheck = $article.querySelector('.check-button') as HTMLButtonElement;
    $btnCheck.onclick = () => completeUncompletetoDo(toDo.id);



    return $article;
}

function printToDos (arrayToDos = allToDos) {
  // Primero borro el section
  $toDoList.innerHTML = '';

  for (const toDo of arrayToDos) {
    // generar article en memoria
    const $article = createToDo(toDo);
  
    $toDoList.append($article);  
  }
}

function handleAddToDo (event: KeyboardEvent) {

  if (event.code === 'Enter') {
    
    const task = $inputTask.value;
    
    if (task.trim() === '') {
      console.error('No puedes dejar la tarea vacía');
      return;
    }
    
    // Aquí ya sabemos que está todo correcto

    const newToDo: ToDo = {
      id: nanoid(6),
      task: task,
      isCompleted: false
    }

    // Meterlo en el array de toDos
    allToDos.push(newToDo);

    // Vuelve a imprimir los ToDos
    printToDos();
    updateItemsLeft();

    // Vací el input
    $inputTask.value = '';
  }
}

function handleClearCompleted () {
  for (let i = 0; i < allToDos.length; i++) {
    const toDo = allToDos[i];
    
    if (toDo.isCompleted) {
      allToDos.splice(i, 1);
      i--;
    }
  }

  printToDos();
}

// Al arrancar que se impriman los todos
printToDos(allToDos);
// Calculo los que faltan por completar
updateItemsLeft();


$inputTask.addEventListener('keyup', handleAddToDo);

$clearCompleted.addEventListener('click', handleClearCompleted);