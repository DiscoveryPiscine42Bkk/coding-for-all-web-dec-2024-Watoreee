document.addEventListener("DOMContentLoaded", () => {
    const listContainer = document.getElementById("ft_list");
    const newBtn = document.getElementById("new-btn");

    const loadTodos = () => {
        const todos = document.cookie
            .split("; ")
            .find(row => row.startsWith("todos="));
        if (todos) {
            return JSON.parse(decodeURIComponent(todos.split("=")[1]));
        }
        return [];
    };

    const saveTodos = todos => {
        document.cookie = `todos=${encodeURIComponent(
            JSON.stringify(todos)
        )}; path=/;`;
    };

    const renderTodos = todos => {
        listContainer.innerHTML = "";
        todos.forEach(todo => {
            const todoDiv = document.createElement("div");
            todoDiv.className = "todo-item";
            todoDiv.textContent = todo;
            todoDiv.addEventListener("click", () => {
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

    newBtn.addEventListener("click", () => {
        const newTodo = prompt("Enter a new to-do:");
        if (newTodo && newTodo.trim()) {
            todos.unshift(newTodo.trim());
            saveTodos(todos);
            renderTodos(todos);
        }
    });
});
