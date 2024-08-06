const form = document.querySelector('#submissionForm');
const uploadSubmissionError = document.querySelector('.uploadSubmissionError')
const reportError = document.querySelector('.reportError')

form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const formData= new FormData(e.target);

    const result = await fetch(`/project/${projectId}/tasks/${taskId}/submission`,
        {
            method: 'POST',
            body: formData
        }
    )
    const res = await result.json();
    console.log(res)
    if(res.err){
        uploadSubmissionError.textContent = res.err.uploadSubmission
        reportError.textContent = res.err.report
    }else{
        location.assign('/user/allsubmission')
    }
})