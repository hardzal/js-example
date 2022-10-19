const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function generatedId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  }
}

function addToast(desc) {
  let descToast = document.getElementById("desc");
  descToast.innerHTML = desc;
}

/**
 * 
 * @param {number} todoId 
 * @returns array
 */

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

/**
 * 
 * @param {number} todoId 
 * @returns number
 */
function findTodoIndex(todoId) {
  for(const index in todos) {
    if(todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
}

/**
 * Fungsi ini bertujuan untuk memeriksa apakah web storage didukung oleh browser atua tidak
 * 
 * @returns boolean
 */ 
function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkkan data hasil parsing ke variabel {todos}
 */

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY); // mengamnbil data storage
    let data = JSON.parse(serializedData); // mengubah json menjadi object
   
    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya
 */
function saveData() {
    if(isStorageExist()) {
        const parsed = JSON.stringify(todos); // convert string to json
        localStorage.setItem(STORAGE_KEY, parsed);
        // membuat event SAVED_EVENT ke document
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}
/**
 * 
 * @param {object} todoObject 
 * @returns HTMLElement
 */
function makeTodo(todoObject) {
  const {id, task, timestamp, isCompleted} = todoObject;
  
  const textTitle = document.createElement('h2');
  textTitle.innerText = task;

  const textTimetamp = document.createElement('p');
  textTimetamp.innerText = timestamp;

  const textContainer = document.createElement('div');
  textContainer.classList.add('innner');
  textContainer.append(textTitle, textTimetamp);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${id}`);

  if(isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function() {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function() {
      removeTaskCompleted(id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function() {
      addTaskToCompleted(id);
    });

    container.append(checkButton);
  }
  
  return container;
}

/**
 * Proses menambahkan todo ke todos
 */

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const  timestamp = document.getElementById('date').value;

    const generateId = generatedId();
    const todoObject = generateTodoObject(generateId, textTodo, timestamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    addToast("Berhasil Menambahkan Tugas");
    saveData();
}

/**
 * Mengubah status todo menjadi complete
 * @param {*} todoId 
 * @returns 
 */

function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    
    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    addToast("Berhasil Menyelesaikan Tugas");
    saveData();
}

/**
 * Menghapus todo yang telah complete
 * @param {*} todoId 
 * @returns 
 */

function removeTaskCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if(todoTarget == -1) return;

    todos.splice(todoTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    addToast("Berhasil Menghapus Tugas");
    saveData();
}

/**
 * Mengubah status completed menjadi uncompleted
 * @param {*} todoId 
 * @returns 
 */

function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    addToast("Memindahkan tugas");
    saveData();
}


document.addEventListener(SAVED_EVENT, function() {
  let toast = document.getElementById("toast");

  toast.className = "show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 5000);
  // console.log(localStorage.getItem(STORAGE_KEY));
});


document.addEventListener('DOMContentLoaded', function () {
  
  const submitForm = document.getElementById('form');

  submitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});


document.addEventListener(RENDER_EVENT, function() {
  const uncompletedTODOList = document.getElementById('todos');
  const listCompleted = document.getElementById('completed-todos');

  uncompletedTODOList.innerHTML = '';
  listCompleted.innerHTML = '';

  for(const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if(todoItem.isCompleted) {
      listCompleted.append(todoElement);
    } else {
      uncompletedTODOList.append(todoElement);
    }
  }
});