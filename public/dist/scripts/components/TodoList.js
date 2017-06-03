/**
 * Created by sania_000 on 27.05.2017.
 */
var todoItem=TODO_APP.components.TodoItem;
var todoActionBar=TODO_APP.components.TodoActionBar;
var todoMain=TODO_APP.components.TodoMain;

TODO_LIST_SELECTOR='.todo-list';

var TodoList=document.querySelector(TODO_LIST_SELECTOR);

var todoList={
    completedAll:  function completedAll() {
        for(var i=0;i<TodoList.children.length;i++){
            todoItem.makeCompleted(TodoList.children[i]);
        }
        todoActionBar.SetCounter(0);
    },
    clearCompleted: function clearCompleted() {
        for(var i=TodoList.children.length-1;i>=0;i--){
            if (TodoList.children[i].children[0].children[0].checked){
                todoItem.removeItem(TodoList.children[i]);
            }
        }
        todoMain.checkList(list.children.length);
    }
}


TODO_APP.components.TodoList = todoList;