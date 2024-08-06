const form = document.querySelector('#addTask');
const taskNameError = document.querySelector('.taskNameError')
const descriptionError = document.querySelector('.descriptionError')
const deadlineError = document.querySelector('.deadlineError')
const assignToError = document.querySelector('.assignToError')

//preview
const previewContainer = document.querySelector('.preview')
const previewBtn = document.querySelector('#preview-btn')
const preview = document.querySelector('.task-description-preview')

//buttons
const submitBtn = document.querySelector("button[type='submit']")
const loadingBtn = document.querySelector('.loadingbtn')

previewBtn.addEventListener('click', (e) => {
    if (form.description.value) {
        e.preventDefault();
        preview.innerHTML = form.description.value
        previewContainer.classList.remove('d-none')
    }
})


form.addEventListener('submit', async (e) => {
    e.preventDefault();


    submitBtn.classList.add('d-none')
    loadingBtn.classList.remove('d-none')



    const formData = new FormData(e.target);

    const result = await fetch(`/project/${projectId}/tasks`, {
        method: 'POST',
        body: formData
    })
    const res = await result.json();
    if (res.err) {
        loadingBtn.classList.add('d-none')
        submitBtn.classList.remove('d-none')
        taskNameError.textContent = res.err.taskName
        descriptionError.textContent = res.err.description
        deadlineError.textContent = res.err.deadline
        assignToError.textContent = res.err.assignTo
    } else {
        location.assign(`/project/${projectId}/tasks/${res.msg}`)
    }

})