var templateTodoItem=TODO_APP.modules.templates;
var todoItem=TODO_APP.components.TodoItem;
var todoMain=TODO_APP.components.TodoMain;
var todoList=TODO_APP.components.TodoList;
var todoActionBar=TODO_APP.components.TodoActionBar;

var TODO_INPUT_SELECTOR='.todo-add_input';
var TODO_LIST_SELECTOR='.todo-list';
var TODO_SELECT_ALL_SELECTOR='.js-todo-add_select-all';

var ACTION_CLICK='click';
var ACTION_KEYDOWN='keydown';
var ACTION_CHANGE='change';

var ENTER_KEY_CODE=13;

var input = document.querySelector(TODO_INPUT_SELECTOR);
var list = document.querySelector(TODO_LIST_SELECTOR);
var selectAll=document.querySelector(TODO_SELECT_ALL_SELECTOR);

input.addEventListener(ACTION_KEYDOWN, function (e) {
    if (e.keyCode === ENTER_KEY_CODE) {
        processingInput();
    }
});

selectAll.addEventListener(ACTION_CLICK,function (e) {
    todoList.completedAll();
});

function processingInput() {
    var text = input.value.trim();
    if (text.length !== 0) {
        input.value = '';
        addItem(text);
    }
}
function addItem(text) {
    var templateResult = templateTodoItem.todoItem({
        text: text
    });
    list.appendChild(templateResult.root);
    todoMain.checkList(list.children.length);
    todoActionBar.IncCounter();

    templateResult.removeAction.addEventListener(
        ACTION_CLICK,
        function (e) {
            e.preventDefault();
            var item = templateResult.root;
            todoItem.removeItem(item);
            if (!item.children[0].children[0].checked){
                todoActionBar.DecCounter();
            }
            todoMain.checkList(list.children.length);
        }
    );

    templateResult.markReady.addEventListener(
        ACTION_CHANGE,
        function (e) {
            e.preventDefault();
            var item=templateResult.root;
            todoItem.makeChange(item,templateResult.markReady);
        }
    )
}