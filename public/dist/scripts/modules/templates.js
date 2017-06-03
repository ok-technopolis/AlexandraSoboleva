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

    TODO_APP.modules.templates=templates;