$(document).ready(function() {
    const listContainer = $('#ft_list');
    const newBtn = $('#new-btn');

    const loadTodos = () => { //load saved to-dos from cookies.
        const todos = document.cookie
            .split('; ')
            .find(row => row.startsWith('todos='));
        if (todos) {
            return JSON.parse(decodeURIComponent(todos.split('=')[1]));
        }
        return [];
    };

    const saveTodos = (todos) => {
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
    };

    const renderTodos = (todos) => {
        listContainer.empty();
        [...todos].reverse().forEach(todo => {
            const todoDiv = $('<div>')
                .addClass('todo-item')
                .text(todo)
                .click(function() {
                    if (confirm(`Do you want to remove this task: "${todo}"?`)) {
                        const index = todos.indexOf(todo);
                        if (index !== -1) {
                            todos.splice(index, 1);
                            saveTodos(todos);
                            renderTodos(todos);
                        }
                    }
                });
            listContainer.prepend(todoDiv);
        });
    };

    let todos = loadTodos();
    renderTodos(todos);

    newBtn.click(function() {
        const newTodo = prompt('Enter a new to-do:');
        if (newTodo !== undefined && newTodo !== null) {
            if (newTodo !== '') {
                todos.unshift(newTodo);
                saveTodos(todos);
                renderTodos(todos);
            }
        }
    }); 
});
