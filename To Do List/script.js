document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="remove">Remove</button>
        `;

        // Add the event listener for the remove button
        li.querySelector('.remove').addEventListener('click', () => {
            taskList.removeChild(li);
        });

        // Add the event listener for marking tasks as complete
        li.querySelector('span').addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        taskList.appendChild(li);
        taskInput.value = ''; // Clear the input field
    });

    // Optionally, handle Enter key press to add tasks
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
