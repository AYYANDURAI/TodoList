var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var todoOption = document.querySelector(".filter-todo")

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoOption.addEventListener("click", filterTodo);

function addTodo(e) {
    e.preventDefault();
    var todoDiv = document.createElement("div");

    var li = document.createElement("li");
    todoDiv.classList.add("todo");
    li.innerText = todoInput.value;
    li.classList.add("todo-item");
    todoDiv.appendChild(li);

    saveLocalTodos(todoInput.value);

    var completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    var trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    var item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        var todoDiv = document.createElement("div");
        var li = document.createElement("li");
        todoDiv.classList.add("todo");
        li.innerText = todo;
        li.classList.add("todo-item");
        todoDiv.appendChild(li);
        var completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fa fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        var trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fa fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}