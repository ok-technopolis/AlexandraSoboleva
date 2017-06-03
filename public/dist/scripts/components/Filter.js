/**
 * Created by sania_000 on 03.06.2017.
 */

var FILTER_SELECTOR='filtres-item';
var FILTER_ACTIVE_MODIFICATOR='__active';
var TODO_LIST_SELECTOR='.todo-list';
var TODO_ITEM_MODIFICATOR='__completed';

var Filters=document.getElementsByClassName(FILTER_SELECTOR);
var TodoList=document.querySelector(TODO_LIST_SELECTOR);

var filterAll;
var filterActive;
var filterCompleted;

for(var i=0;i< Filters.length;i++){
    var item=Filters[i];
    switch (item.getAttribute("data-filter")){
        case "all":
            item.addEventListener('click',showAll);
            filterAll=item;
            break;
        case "active":
            item.addEventListener('click',showActive);
            filterActive=item;
            break;
        case "completed":
            item.addEventListener('click',showCompleted);
            filterCompleted=item;
            break;
    }

}

function changeModificator(item){
    document.querySelector('.filtres-item.__active').classList.remove(FILTER_ACTIVE_MODIFICATOR);
    item.classList.add(FILTER_ACTIVE_MODIFICATOR);
}

function showAll() {
    changeModificator(filterAll);
    for (var i=0;i<TodoList.children.length;i++){
        TodoList.children[i].style.display="flex";
    }
}

function showActive() {
   changeModificator(filterActive)
    for (var i=0;i<TodoList.children.length;i++) {
        if (!TodoList.children[i].classList.contains(TODO_ITEM_MODIFICATOR)) {
            TodoList.children[i].style.display = "flex";
        }else{
            TodoList.children[i].style.display = "none";
        }
    }
}

function showCompleted() {
    changeModificator(filterCompleted)
    for (var i=0;i<TodoList.children.length;i++) {
        if (TodoList.children[i].classList.contains(TODO_ITEM_MODIFICATOR)) {
            TodoList.children[i].style.display = "flex";
        }else{
            TodoList.children[i].style.display = "none";
        }
    }
}