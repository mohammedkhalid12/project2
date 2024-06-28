document.getElementById('addTask').addEventListener('click', function() {
    var taskForm = document.getElementById('taskForm');
    taskForm.classList.toggle('hidden');
});

document.getElementById('submitTask').addEventListener('click', function() {
    var taskName = document.getElementById('taskName').value;
    var taskDate = document.getElementById('taskDate').value;
    var taskPriority = document.getElementById('taskPriority').value;

    if (taskName === '' || taskDate === '' || taskPriority === '') {
        return;
    }

    let task = [];
    if (localStorage.getItem('task') != null) {
        task = JSON.parse(localStorage.getItem('task'));
    }

    let newTask = {
        taskName: taskName,
        taskDate: taskDate,
        taskPriority: taskPriority
    };

    task.push(newTask);
    localStorage.setItem('task', JSON.stringify(task));
    clearData();
    showData();
});

function clearData() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskPriority').value = '';
}

function deleteTask(index) {
    let task = JSON.parse(localStorage.getItem('task'));
    task.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(task));
    showData();
}

function showData() {
    let task = [];
    if (localStorage.getItem('task') != null) {
        task = JSON.parse(localStorage.getItem('task'));
    }

    let table = '';
    for (let i = 0; i < task.length; i++) {
        table += `
            <tr>
                <td>${task[i].taskName}</td>
                <td>${task[i].taskDate}</td>
                <td>${task[i].taskPriority}</td>
                <td><button onclick="deleteTask(${i})">Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
}

window.onload = showData;