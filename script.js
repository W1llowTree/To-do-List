const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('task-submit');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('remove-all');
const todos = JSON.parse(localStorage.getItem('todos')) || []

function render() {
    todos.forEach((taskName, index) => {
        const task = document.createElement('li') ;
            
        task.innerHTML = `
            <div class='task-item'>
                <button type="button" data-index=${index} class="btn btn-success delete-button">✔</button>
                <span>${taskName}</span>
            </div>
        `;
    
        const deleteButton = task.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            const taskIndex = deleteButton.getAttribute('data-index');
            todos.splice(taskIndex, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            taskList.innerHTML = '';
            render();
        })
        taskList.appendChild(task);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName != '') {
        const task = document.createElement('li') ;

        todos.push(taskName);
        localStorage.setItem('todos', JSON.stringify(todos));
        taskList.innerHTML = '';
        render();
        taskInput.value = '';
    }
}

function clear() {
    console.log("clear");
    while (todos.length > 0) {
        todos.pop();
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    taskList.innerHTML = '';
    render();
}

// Adding Button Event Listener
addButton.addEventListener('click', addTask);

// Adding Task Input Event Listener
taskInput.addEventListener("keypress", (event) => {
    if (event.key == 'Enter') {
        addTask();
    }
});

// Adding Clear All
clearButton.addEventListener('click', clear);

// First Render
render();

