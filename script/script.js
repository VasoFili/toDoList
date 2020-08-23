'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

// const showStorage = function () {
//    todoData = JSON.parse(localStorage.myTodo);
// };
// showStorage();

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
         render();
      });

      const btnRecycleBin = li.querySelector('.todo-remove');
      btnRecycleBin.addEventListener('click', function (event) {
         li.remove();
         // render();
      });
   });

};

todoControl.addEventListener('submit', function (event) {
   event.preventDefault();

   const newTodo = {
      value: headerInput.value,
      completed: false,
   }
   if (headerInput.value !== '') {
      todoData.push(newTodo);
      headerInput.value = '';
      render();
   };

   localStorage.myTodo = JSON.stringify(todoData);
});

render();