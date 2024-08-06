    const form = document.querySelector('#editprojectform')
    const projectNameError = document.querySelector('.projectNameError')
    const imageError = document.querySelector('.imageError')
    const descriptionError = document.querySelector('.descriptionError')
    // const deletImages =document.querySelectorAll('.btn-check')
    
    //preview
    const previewContainer = document.querySelector('.preview')
    const previewBtn = document.querySelector('#preview-btn')
    const preview = document.querySelector('.description-preview')

    projectNameError.textContent = ''
    imageError.textContent = ''
    descriptionError.textContent = ''

    previewBtn.addEventListener('click',(e)=>{
        if(form.description.value){
        e.preventDefault();
        preview.innerHTML = form.description.value
        previewContainer.classList.remove('d-none')
        }
    })

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        // console.log(e)
        // const deleteImages = Array.from(document.querySelectorAll('input[name="deleteImages"]:checked'))
        // .map(checkbox => checkbox.value);

        // Append deleteImages to FormData
        const formData = new FormData(e.target);
        // deleteImages.forEach(image => formData.append('deleteImage[]', image));
        try{
            const res = await fetch(`/project/${dataId}`,{
                method: 'PATCH',
                body: formData
            })
            const result =  await res.json();

            if(result.err){
                projectNameError.textContent = result.err.projectName
                imageError.textContent = result.err.image
                descriptionError.textContent = result.err.description
            }
            else{
                window.location.assign(`/project/${result.id}`);
            }

        }catch(err){
            console.log(err)
        }
    })