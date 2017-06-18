/**
 * Created by sania_000 on 14.06.2017.
 */

var TodoMain = require('./components/TodoMain');
var TodoAdd = require('./components/TodoAdd');
var TodoList = require('./components/TodoList');
var TodoActionBar = require('./components/TodoActionBar');

function init() {
    var todoMain = new TodoMain();
    var todoAdd = new TodoAdd();
    var todoList = new TodoList();
    var todoActionBar = new TodoActionBar();


    todoAdd
        .on('newTodo',
            function (todoData) { todoList.createItem(todoData); }
        )
        .on('markAsReadyAll',
            function () { todoList.markAsReadyAll();}
        );

    function itemsCountWatcher () {
        var itemsCount = todoList.getItemsCount();

        if (itemsCount !== 0) {
            todoMain.showFullInterface();
        }else{
            todoMain.hideFullInterface();
        }

        todoActionBar.setItemsCount(itemsCount);

    }

    todoList.on('itemAdd', itemsCountWatcher)
        .on('itemDelete', itemsCountWatcher);

    todoActionBar.on(
        'clearCompleted',
        function () { todoList.removeCompletedItems(); }
    );

    todoActionBar.on('filterSelected', function (filterId) {
        todoList.setFilter(filterId);
    });

}

document.addEventListener('DOMContentLoaded', init);