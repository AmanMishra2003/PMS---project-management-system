const form = document.querySelector('#redoTask');
const uploadSubmissionError = document.querySelector('.uploadSubmissionError')
const reportError = document.querySelector('.reportError')

//buttons
const submitBtn = document.querySelector("button[type='submit']")
const loadingBtn = document.querySelector('.loadingbtn')

form.addEventListener('submit',async(e)=>{
    e.preventDefault()

    submitBtn.classList.add('d-none')
    loadingBtn.classList.remove('d-none')
    const formData= new FormData(e.target);

    const result = await fetch(`/project/${projectId}/tasks/${taskId}/submission/${id}`,
        {
            method: 'PATCH',
            body: formData
        }
    )
    const res = await result.json();
    console.log(res)
    if(res.err){
        loadingBtn.classList.add('d-none')
        submitBtn.classList.remove('d-none')
        uploadSubmissionError.textContent = res.err.uploadSubmission
        reportError.textContent = res.err.report
    }else{
        location.assign('/user/allsubmission')
    }
})