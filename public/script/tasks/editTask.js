const form = document.querySelector('#addTask');
const taskNameError = document.querySelector('.taskNameError')
const descriptionError = document.querySelector('.descriptionError')
const deadlineError = document.querySelector('.deadlineError')
const assignToError = document.querySelector('.assignToError')

    //preview
const previewContainer = document.querySelector('.preview')
const previewBtn = document.querySelector('#preview-btn')
const preview = document.querySelector('.task-description-preview')

previewBtn.addEventListener('click', (e) => {
if (form.description.value) {
    e.preventDefault();
    preview.innerHTML = form.description.value
    previewContainer.classList.remove('d-none')
}
})

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);

    const result = await fetch(`/project/${projectId}/tasks/${taskId}`,{
        method : 'PATCH',
        body : formData
    })
    const res = await result.json();
    if(res.err){
        taskNameError.textContent = res.err.taskName 
        descriptionError.textContent = res.err.description
        deadlineError.textContent = res.err.deadline
        assignToError.textContent = res.err.assignTo
    }else{
        location.assign(`/project/${projectId}/tasks/${res.msg}`)
    }

})