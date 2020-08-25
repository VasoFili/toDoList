'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [];
// todoData = localStorage.myToto;
// console.log(todoData);

// let showToDo = function () {
//todoData = JSON.parse(localStorage.myToto);
// todoData = todoData.split(',');
// };
// showToDo();

const render = function () {
   todoList.textContent = '';
   todoCompleted.textContent = '';

   todoData.forEach(function (item) {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
         '<div class = "todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
         '</div>';

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      };

      const btnTodoCompleted = li.querySelector('.todo-complete');
      btnTodoCompleted.addEventListener('click', function () {
         item.completed = !item.completed;
         localStorage.clear();
         render();
      });

      const btnRecycleBin = li.querySelector('.todo-remove');
      btnRecycleBin.addEventListener('click', function () {
         let index = todoData.indexOf(item);
         todoData.splice(index, 1);
         localStorage.clear();
         render();
      });
   });
   localStorage.setItem(todoData, JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function (event) {
   event.preventDefault();

   if (headerInput.value !== '') {
      const newTodo = {
         value: headerInput.value,
         completed: false,
      }
      todoData.push(newTodo);
      localStorage.clear();
      headerInput.value = '';
      render();
   };
});

render();