var extendConstructor = require('../utils/extendConstructor');
var getTextNode = require('../utils/getTextNode');
var Eventable = require('../modules/Eventable');
var Filter = require('../components/Filter');

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