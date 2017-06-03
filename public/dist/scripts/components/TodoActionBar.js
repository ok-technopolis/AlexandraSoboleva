/**
 * Created by sania_000 on 27.05.2017.
 */
var todoList=TODO_APP.components.TodoList;

var TODO_COUNTER_SELECTOR = '.todo-action-bar_counter-not-completed';
var TODO_CLEAR_COMPLETED_SELECTOR='.todo-action-bar_clear-completed';
var COUNTER_PHRASE=" item left";

var TodoCounter=document.querySelector(TODO_COUNTER_SELECTOR);
var TodoClearCompleted=document.querySelector(TODO_CLEAR_COMPLETED_SELECTOR);
var countLeft=0;

TodoClearCompleted.addEventListener('click',function (e) {
    todoList.clearCompleted();
});



var todoActionBar={
    SetCounter: function setCounter(count){
        countLeft=count;
        showCounter();
    },
    IncCounter: function incrementCounter() {
        countLeft++;
        showCounter();
    },
    DecCounter: function decrementCounter() {
        countLeft--;
        showCounter();
    }

}

function showCounter() {
    TodoCounter.textContent=countLeft+COUNTER_PHRASE;
}

TODO_APP.components.TodoActionBar = todoActionBar;