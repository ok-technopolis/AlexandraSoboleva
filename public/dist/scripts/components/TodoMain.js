/**
 * Created by sania_000 on 27.05.2017.
 */

var TODO_MAIN_SELECTOR = '.todo-main';
var FULL_INTERFACE_MODIFICATOR = '__has-todo';

var Main=document.querySelector(TODO_MAIN_SELECTOR);

var todoMain={
    checkList: function check(count) {
        if (count===1) {
            showInterface();
        }else if(count===0){
            hideInterface();
        }
    }
}

 function showInterface(){
    Main.classList.add(FULL_INTERFACE_MODIFICATOR);
}

function hideInterface(){
    Main.classList.remove(FULL_INTERFACE_MODIFICATOR);
}

TODO_APP.components.TodoMain = todoMain;