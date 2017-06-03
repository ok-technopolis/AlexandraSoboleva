/**
 * Created by sania_000 on 27.05.2017.
 */
var todoActionBar=TODO_APP.components.TodoActionBar;

var CHECKBOX_MODIFICATOR='__completed';

var todoItem={
removeItem: function removeItem(item) {
    item.parentNode.removeChild(item);
},

makeChange: function makeChange(item,state){
    if (!state.checked){
        item.classList.remove(CHECKBOX_MODIFICATOR);
        todoActionBar.IncCounter();

    }else{
        item.classList.add(CHECKBOX_MODIFICATOR);
        todoActionBar.DecCounter();
    }

    return true;
},

makeCompleted: function makeCompleted(item) {
    if (!item.children[0].children[0].checked){
        item.classList.add(CHECKBOX_MODIFICATOR);
        item.children[0].children[0].checked=true;
    }
}

};

TODO_APP.components.TodoItem=todoItem;