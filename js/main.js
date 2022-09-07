'use strict'
import { UI_ELEMENTS } from "./view.js"

export const STATUSES = {
    TO_DO: 'To Do',
    DONE: 'Done',
}

const PRIORITY = {
    LOW: 'Low',
    HIGH: 'High'
}

const DEFAULT = {
    STATUS: STATUSES.TO_DO,
    PRIORITY: PRIORITY.LOW
}

export const list = [];

window.addEventListener('load', addTasksFromScreen);

function addTasksFromScreen() {
    for (let task of UI_ELEMENTS.TASKS_ON_SCREEN) {
        const TASK_PROPERTIES = {
            HAS_CLASS: task.classList.contains('template'),
            TASK_NAME: task.querySelector('.task__text').textContent,
            TASK_STATUS: task.querySelector('.task__checkbox').classList.contains('task__checkbox--done')
                ? STATUSES.DONE : DEFAULT.STATUS,
            TASK_PRIORITY: task.closest('.form')
        }
        if (!TASK_PROPERTIES.HAS_CLASS) {
            list.push({
                name: TASK_PROPERTIES.TASK_NAME,
                status: TASK_PROPERTIES.TASK_STATUS,
                priority: TASK_PROPERTIES.TASK_PRIORITY.classList.contains('low') ? DEFAULT.PRIORITY : PRIORITY.HIGH
            });
        }
    }
    console.log(list);
}

export function changeStatus(name, status) {
    let taskIndex = list.findIndex(item => item.name === name);
    console.log(taskIndex);
    list[taskIndex].status = status;
    console.log(list);
}

export function addTask(event, name) {
    list.push({
        name,
        status: DEFAULT.STATUS,
        priority: event.currentTarget.classList.contains("high") ? PRIORITY.HIGH : DEFAULT.PRIORITY
    });
    console.log(list);
}

export function deleteTask(name) {
    let index = list.findIndex(item => item.name === name);
    if (index >= 0) {
        list.splice(index, 1);
    }
    console.log(list);
}

export function searchInList(taskName) {
    const isTaskInList = list.find(item => item.name === taskName.value);
    return isTaskInList;
}