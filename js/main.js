const toDoInput = document.querySelector('.todo__enter-task');
const taskContainer = document.querySelector('.todo__tasks');
const addTaskBtn = document.querySelector('.todo__btn');
const form = document.forms.headForm;
console.log(form);
let arrTask = JSON.parse(localStorage.task || '[]');

reload();
//listener
taskContainer.addEventListener('change', onChangeStatus);
taskContainer.addEventListener('click', onDelTask);



function reload() {
    arrTask.forEach(elem => templateTask(elem.taskDescr, elem.index));
    checkStatus();
};

function objOneTask() {
    const objTask = {
        taskDescr: toDoInput.value,
        status: false,
        index: Date.now(),
    }
    return objTask
};

function checkSameTask() {
    let sameTaskCount = 0;
    arrTask.forEach(elem => elem.taskDescr.toLowerCase() == toDoInput.value.toLowerCase() ? sameTaskCount++ : sameTaskCount);
    return sameTaskCount
}

function templateTask(taskName, id) {
    taskContainer.innerHTML += `  
            <li class="todo__task">
            <label class="todo__label">
            <input class="todo__checkbox" type="checkbox" id=${id}>
            <span class="todo__custom-checkbox"></span>
            </label>
            <span class="todo__content">${taskName}</span>
            <button class="todo__btn-delate box__shadow-blue--hover"></button>
            </li>
            `
    setTimeout(() => {
        let taskAll = document.querySelectorAll('.todo__task');
        taskAll.forEach(elem => elem.classList.add('active'));
    }, 500)

};

function onDelTask(e) {
    let btnDelate = e.target;
    if (!btnDelate.classList.contains('todo__btn-delate')) return
    btnDelate.parentNode.classList.add('del');
    setTimeout(() => {
        arrTask = arrTask.filter(objItem => objItem.taskDescr !== e.target.previousElementSibling.textContent);
        localStorage.setItem('task', JSON.stringify(arrTask));
        btnDelate.parentNode.remove();
    }, 800)
};

function onChangeStatus(e) {
    let checkBox = e.target;
    if (!checkBox.classList.contains('todo__checkbox')) return
    arrTask.forEach(elem => {
        if (elem.taskDescr == checkBox.parentNode.nextElementSibling.textContent) {
            elem.status = !elem.status;
            checkBox.getAttribute('checked') == 'checked' ? checkBox.removeAttribute('checked') : checkBox.setAttribute('checked', 'checked');
        }
    });
    checkBox.parentNode.nextElementSibling.classList.toggle('todo__task--done');
    localStorage.setItem('task', JSON.stringify(arrTask));
};

function checkStatus() {
    let checkBoxAll = document.querySelectorAll('.todo__checkbox');
    checkBoxAll.forEach((checkBox, index) => {
        if (arrTask[index].status) {
            checkBox.setAttribute('checked', 'checked');
            checkBox.parentNode.nextElementSibling.classList.add('todo__task--done');
        }
        else checkBox.parentNode.nextElementSibling.classList.remove('todo__task--done');
    });
};

function showErrorEnterInput() {
    toDoInput.parentElement.insertAdjacentHTML(
        'afterend',
        `<p class = 'todo__input-error'>
        This task is already in the list
        </p>
        `
    );
    setTimeout(() => {
        toDoInput.nextElementSibling ? form.nextElementSibling.remove() : form.nextElementSibling
    }, 3000)
}

document.querySelector('.todo__btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (toDoInput.value == '') return
    if (checkSameTask() > 0) {
        showErrorEnterInput();
        return
    }
    let elem = objOneTask();
    templateTask(toDoInput.value, Date.now());
    arrTask.push(elem);
    localStorage.setItem('task', JSON.stringify(arrTask));
    toDoInput.value = '';
});



























