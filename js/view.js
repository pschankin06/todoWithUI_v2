import {
    deleteTask,
    changeStatus,
    STATUSES,
    addTask,
    searchInList
} from "./main.js";

export const UI_ELEMENTS = {
    DELETE_BUTTONS: document.querySelectorAll('.delete-button'),
    CHECKOUT_BUTTONS: document.querySelectorAll('.task__checkbox'),
    TASKS_ON_SCREEN: document.querySelectorAll('.task__wrapper'),
    FORMS: document.querySelectorAll('.form'),
}

for (let button of UI_ELEMENTS.DELETE_BUTTONS) {
    button.addEventListener('click', deleteTaskUi);
}

for (let button of UI_ELEMENTS.CHECKOUT_BUTTONS) {
    button.addEventListener('click', checkout);
}

for (let form of UI_ELEMENTS.FORMS) {
    form.addEventListener('submit', createTask);
}

function deleteTaskUi(event) {
    const currentTask = event.currentTarget;
    const name = currentTask.previousElementSibling.textContent;
    const taskBox = currentTask.closest('.task__wrapper');
    deleteTask(name);
    taskBox.remove();
}

function checkout(event) {
    const currentTask = event.currentTarget;
    const name = currentTask.nextElementSibling.textContent;
    const status = currentTask.classList.contains('task__checkbox--done') ? STATUSES.TO_DO : STATUSES.DONE;
    console.log(name);
    console.log(status);
    changeStatus(name, status);
    currentTask.classList.toggle('task__checkbox--done');
    currentTask.closest('.task__wrapper').classList.toggle('task__wrapper--done');
}

function createTask(event) {
    try {
        const currentTask = event.currentTarget;
        const taskName = currentTask.querySelector('.main__new-task');
        const newTask = document.querySelector('.template').cloneNode(true);
        const deleteButton = newTask.querySelector('.delete-button');
        const checkoutButton = newTask.querySelector('.task__checkbox');
        const newTaskText = newTask.querySelector('.task__text');
        const isTaskInList = searchInList(taskName);
        const isNotValid = (taskName.value === '' || isFinite(taskName.value) || isTaskInList);

        if (isNotValid) {
            clearInput(taskName);
            throw new Error;
        } else {
            addTask(event, taskName.value);
            addListenersToCreatedTask(deleteButton, checkoutButton);
            makeTaskVisible(newTask);
            addTaskText(taskName, newTaskText);
            showTask(currentTask, newTask)
            console.log(newTask);
            clearInput(taskName);
        }
    } catch (error) {
        alert('task is not valid or task is already exists');
    }
}

function addListenersToCreatedTask(deleteButton, checkoutButton) {
    deleteButton.addEventListener('click', deleteTaskUi);
    checkoutButton.addEventListener('click', checkout);
}

function makeTaskVisible(newTask) {
    newTask.classList.remove('template');
}

function addTaskText(taskName, newTaskText) {
    newTaskText.textContent = taskName.value;
}

function showTask(currentTask, newTask) {
    currentTask.append(newTask);
}

function clearInput(taskName) {
    taskName.value = '';
}
