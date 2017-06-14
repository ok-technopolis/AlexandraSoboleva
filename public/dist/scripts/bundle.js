/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by sania_000 on 14.06.2017.
 */

function Eventable() {}

var eventablePrototype = Eventable.prototype;

eventablePrototype._initEventable = function () {
    this._eventable_registry = {};
};

function getEventSubscribers(eventable, eventName, needCreate) {
    var registry = eventable._eventable_registry;

    if (eventName in registry) {
        return registry[eventName];

    } else if (needCreate) {
        return registry[eventName] = [];
    }

    return null;
}

eventablePrototype.on = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName, true);

    subscribers.push({
        handler: handler,
        ctx: ctx
    });

    return this;
};

eventablePrototype.off = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        for (var i = subscribers.length; i-- ;) {
            if ((subscribers[i].handler === handler)
                && (subscribers[i].ctx === ctx)
            ) {
                subscribers.splice(i, 1);
                return this;
            }
        }
    }

    return this;
};

eventablePrototype.trigger = function (eventName, data) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        var subscribersCopy = subscribers.slice();
        for (var i = 0, l = subscribersCopy.length; i !== l; i += 1) {
            subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
        }
    }

    return this;
};

module.exports = Eventable;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by sania_000 on 14.06.2017.
 */

/**
 * @param {Function} Extendable
 * @param {Function} Extension
 * @return {Function} Extendable
 */
function extendConstructor(Extendable, Extension) {
    var extendablePrototype = Extendable.prototype;
    var extensionPrototype = Extension.prototype;

    for (var p in extensionPrototype) {
        extendablePrototype[p] = extensionPrototype[p];
    }

    return Extendable;
}

module.exports = extendConstructor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var extendConstructor = __webpack_require__(1);
var getTextNode = __webpack_require__(10);
var Eventable = __webpack_require__(0);
var Filter = __webpack_require__(6);

/**
 * @constructor
 * @implements {EventListener}
 */
function TodoActionBarConstructor() {
    this._initEventable();

    this._counterNode = document.querySelector('.js-todo-action-bar_counter');
    this._counterNodeText = getTextNode(this._counterNode);
    this._clearCompletedNode = document.querySelector('.js-todo-action-bar_clear-completed');

    this._clearCompletedNode.addEventListener('click', this);

    this._filters = new Filter(document.querySelector('.js-todo-action-bar_filtres'));

    this._filters.on('filterSelected', this._onFilterSelected, this);
}

extendConstructor(TodoActionBarConstructor, Eventable);

var todoActionBarConstructorPrototype = TodoActionBarConstructor.prototype;

todoActionBarConstructorPrototype._onFilterSelected = function (filterId) {
    this.trigger('filterSelected', filterId);
};

/**
 * @return {TodoActionBarConstructor}
 * @private
 */
todoActionBarConstructorPrototype._clearCompleted = function () {
    this.trigger('clearCompleted');
    return this;
};

/**
 * @param {Number} count
 * @return {TodoActionBarConstructor}
 */
todoActionBarConstructorPrototype.setItemsCount = function (count) {

    this._counterNodeText.nodeValue = count + ' item left';
    return this;
};

/**
 * @param {Event} e
 */
todoActionBarConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._clearCompleted();
            break;
    }
};

module.exports = TodoActionBarConstructor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var extendConstructor = __webpack_require__(1);
var Eventable = __webpack_require__(0);

var ENTER_KEY_CODE = 13;

var TODOS_TODO_INPUT_SELECTOR = '.js-todo-input';
var TODOS_SELECT_ALL_SELECTOR = '.js-todo-add_select-all';

/**
 * @implements {EventListener}
 * @extends {Eventable}
 * @constructor
 */
function AddTodosConstructor() {
    this._todoInput = document.querySelector(TODOS_TODO_INPUT_SELECTOR);
    this._todoSelectAll = document.querySelector(TODOS_SELECT_ALL_SELECTOR);

    this._todoInput.addEventListener('keypress', this);
    this._todoSelectAll.addEventListener('click', this);

    this._initEventable();
}

extendConstructor(AddTodosConstructor, Eventable);

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype._markAsReadyAll = function () {
    return this.trigger('markAsReadyAll');
};

addTodosConstructorPrototype._addItem = function () {
    var todoInputValue = this._todoInput.value.trim();

    if (todoInputValue.length !== 0) {
        this._todoInput.value = '';
    }

    return this.trigger('newTodo', {
        text: todoInputValue
    });
};

addTodosConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._markAsReadyAll();
            break;
        case 'keypress':
            if (e.keyCode === ENTER_KEY_CODE) {
                this._addItem();
            }
            break;
    }
};

module.exports = AddTodosConstructor;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Eventable = __webpack_require__(0);
var extendConstructor = __webpack_require__(1);

var TodoItem = __webpack_require__(7);

var TODO_LIST_SELECTOR = '.js-todo-list';
var itemsIdIterator = 0;

/**
 * @extends {Eventable}
 * @constructor
 */
function TodoListConstructor() {
    /**
     * @type {Array.<TodoItemConstructor>}
     * @private
     */
    this._items = [];
    this._todosList = document.querySelector(TODO_LIST_SELECTOR);
    this._currentFilter = 'all';

    this._initEventable();
}

extendConstructor(TodoListConstructor, Eventable);

var todoListConstructorPrototype = TodoListConstructor.prototype;

/**
 * @return {Number}
 */
todoListConstructorPrototype.getItemsCount =function () {
    return this._items.length;
};

todoListConstructorPrototype.getItemsLeftCount =function () {
    var count=0;
    var items = this._items;
    var i = items.length;

    for (; i-- ;) {
        if (!items[i].model.isReady) {
            count++;
        }
    }
    return count;
};

/**
 * @param {Object} todoItemData
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.createItem = function (todoItemData) {
    var item = new TodoItem(Object.assign(
        {
            id: itemsIdIterator++,
        },
        todoItemData
    ));

    this._items.push(item);

    item.on('change', this._onItemChange, this)
        .on('remove', this._onItemRemove, this)
        .render(this._todosList);

    this.trigger('itemAdd', item);

    return this;
};

/**
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.removeCompletedItems = function () {
    var items = this._items;
    var i = items.length;

    for (; i-- ;) {
        if (items[i].model.isReady) {
            items[i].remove();
        }
    }

    return this;
};

/**
 * @param {Number} itemId
 * @return {TodoItem|null}
 * @private
 */
todoListConstructorPrototype._getItemById = function (itemId) {
    var items = this._items;

    for (var i = items.length; i-- ;) {
        if (items[i].model.id === itemId) {
            return items[i];
        }
    }

    return null;
};

todoListConstructorPrototype._onItemChange = function (itemModel) {
    this.filterShowedItems(this._currentFilter);
};

todoListConstructorPrototype._onItemRemove = function (itemId) {
    var todoItemComponent = this._getItemById(itemId);

    if (todoItemComponent) {
        todoItemComponent.off('change', this._onItemChange, this);
        todoItemComponent.off('remove', this._onItemRemove, this);
        var todoItemComponentIndex = this._items.indexOf(todoItemComponent);
        this._items.splice(todoItemComponentIndex, 1);
        this.trigger('itemDelete', todoItemComponent.model);
    }

    return this;
};

/**
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.markAsReadyAll = function () {
    this._items.forEach(function (todoItem) {
        todoItem.setReady(true);
    });

    return this;
};

/**
 * @param {String} filterId
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.setFilter = function (filterId) {
    this._currentFilter = filterId;
    return this.filterShowedItems(filterId);
};

/**
 * @param {String} filterId
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.filterShowedItems = function (filterId) {
    this._items.forEach(function (item) {
        switch (filterId) {
            case 'all':
                item.show();
                break;
            case 'completed':
                if (item.model.isReady) {
                    item.show();
                } else {
                    item.hide();
                }
                break;
            case 'active':
                if (!item.model.isReady) {
                    item.show();
                } else {
                    item.hide();
                }
                break;
        }
    });
    return this;
};

module.exports = TodoListConstructor;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Created by sania_000 on 27.05.2017.
 */

var TODOS_MAIN_SELECTOR = '.js-todo-main';
var FULL_INTERFACE_MODIFICATOR = '__has-todo';

function TodoMainConstructor() {
    this._todosMain = document.querySelector(TODOS_MAIN_SELECTOR);
}

var todoMainComponentConstructorPrototype = TodoMainConstructor.prototype;

todoMainComponentConstructorPrototype.showFullInterface = function () {
    this._todosMain.classList.add(FULL_INTERFACE_MODIFICATOR);
    return this;
};

todoMainComponentConstructorPrototype.hideFullInterface = function () {
    this._todosMain.classList.remove(FULL_INTERFACE_MODIFICATOR);
    return this;
};

module.exports = TodoMainConstructor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Eventable = __webpack_require__(0);
var extendConstructor = __webpack_require__(1);

var ACTIVE_FILTER_MODIFICATOR = '__active';

/**
 * @param {HTMLElement} domRoot
 * @constructor
 * @implements {EventListener}
 */
function FilterConstructor(domRoot) {
    this._initEventable();

    var filters = this._filters = domRoot.querySelectorAll('.filtres-item');
    this._currentActive = null;

    for (var i = filters.length; i-- ;) {
        filters[i].addEventListener('click', this);
        if (filters[i].classList.contains(ACTIVE_FILTER_MODIFICATOR)) {
            this._currentActive = filters[i];
        }
    }
}

extendConstructor(FilterConstructor, Eventable);

var filterConstructorPrototype = FilterConstructor.prototype;

/**
 * @param {HTMLElement} filterElement
 * @return {FilterConstructor}
 * @private
 */
filterConstructorPrototype._setFilter = function (filterElement) {
    if (this._currentActive !== filterElement) {
        this._currentActive.classList.remove(ACTIVE_FILTER_MODIFICATOR);
        filterElement.classList.add(ACTIVE_FILTER_MODIFICATOR);
        this._currentActive = filterElement;
        this.trigger('filterSelected', filterElement.getAttribute('data-filter'));
    }
    return this;
};

filterConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._setFilter(e.target);
            break;
    }
};

module.exports = FilterConstructor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Eventable = __webpack_require__(0);
var extendConstructor = __webpack_require__(1);
var templates = __webpack_require__(9);

var READY_MODIFICATOR = '__completed';
var HIDDEN_MODIFICATOR = '__hide';

/**
 * @param itemData
 * @implements {EventListener}
 * @constructor
 */
function TodoItemConstructor(itemData) {
    this._initEventable();

    var templateResult = templates.todoItem({
        text: itemData.text
    });

    this._root = templateResult.root;
    this._markReady = templateResult.markReady;
    this._removeAction = templateResult.removeAction;
    this._text = templateResult.text;

    this.model = {
        id: itemData.id,
        isReady: itemData.isReady || false,
        text: itemData.text
    };

    if (itemData.isReady) {
        this._setReadyModificator(true);
    }

    this._markReady.addEventListener('change', this);
    this._removeAction.addEventListener('click', this);
    this._text.addEventListener('input', this);
}

extendConstructor(TodoItemConstructor, Eventable);

var todoItemConstructorPrototype = TodoItemConstructor.prototype;

/**
 * @param {HTMLElement} parent
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.render = function (parent) {
    parent.appendChild(this._root);
    return this;
};

/**
 * @param {Event} e
 */
todoItemConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'change':
            this.setReady(this._markReady.checked);
            break;
        case 'click':
            if (e.target === this._removeAction) {
                this.remove();
            }
            break;
        case 'input':
            this.setText(this._text.innerText);
            break;
    }
};

/**
 * @param {String} text
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setText = function (text) {
    if (this.model.text !== text) {
        this._text.innerHTML = text;
        this.model.text = text;
        this.trigger('change', this.model);
    }
    return this;
};

/**
 * @param {Boolean} isReady
 * @return {TodoItemConstructor}
 * @private
 */
todoItemConstructorPrototype._setReadyModificator = function (isReady) {
    if (isReady) {
        this._root.classList.add(READY_MODIFICATOR);
    } else {
        this._root.classList.remove(READY_MODIFICATOR);
    }
    return this;
};

/**
 * @param {Boolean} isReady
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setReady = function (isReady) {
    if (isReady !== this.model.isReady) {
        this._markReady.checked = isReady;
        this.model.isReady = isReady;
        this._setReadyModificator(isReady);
        this.trigger('change', this.model);
    }
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
    this.trigger('remove', this.model.id);
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.show = function () {
    this._root.classList.remove(HIDDEN_MODIFICATOR);
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.hide = function () {
    this._root.classList.add(HIDDEN_MODIFICATOR);
    return this;
};

module.exports = TodoItemConstructor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by sania_000 on 14.06.2017.
 */

var TodoMain = __webpack_require__(5);
var TodoAdd = __webpack_require__(3);
var TodoList = __webpack_require__(4);
var TodoActionBar = __webpack_require__(2);

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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Created by sania_000 on 27.05.2017.
 */
    var div = document.createElement('div');

    function getTemplateRootNode(scriptId) {
        var scriptTag = document.getElementById(scriptId);
        div.innerHTML = scriptTag.innerHTML;
        var result = div.children[0];
        div.removeChild(result);
        return result;
    }

    var templates = {
        todoItem: function (data) {
            var root = getTemplateRootNode('todoItemTemplate');

            var markReady = root.querySelector('.js-todo-item_checkbox');
            var removeAction = root.querySelector('.js-todo-item_remove');
            var text = root.querySelector('.js-todo-item_text');

            if (data.text) {
                text.innerText = data.text;
            }

            if (data.isReady) {
                markReady.checked = true;
            }

            return {
                root: root,
                text: text,
                markReady: markReady,
                removeAction: removeAction
            };
        }
    };

    module.exports = templates;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Created by sania_000 on 14.06.2017.
 */

/**
 * @param {HTMLElement} node
 * @return {Node}
 */
function getTextNode(node) {
    var childs = node.childNodes;
    var i = 0;
    var l = childs.length;

    for (; i !== l; i += 1) {
        if (childs[i].nodeName === '#text') {
            return childs[i];
        }
    }

    var result = document.createTextNode('');
    node.appendChild(result);
    return result;
}

module.exports = getTextNode;

/***/ })
/******/ ]);