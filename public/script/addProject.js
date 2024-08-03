const form = document.querySelector('form')
const projectNameError = document.querySelector('.projectNameError')
const imageError = document.querySelector('.imageError')
const descriptionError = document.querySelector('.descriptionError')

//preview
const previewContainer = document.querySelector('.preview')
const previewBtn = document.querySelector('#preview-btn')
const preview = document.querySelector('.description-preview')



previewBtn.addEventListener('click', (e) => {
    if (form.description.value) {
        e.preventDefault();
        preview.innerHTML = form.description.value
        previewContainer.classList.remove('d-none')
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    projectNameError.textContent = ''
    imageError.textContent = ''
    descriptionError.textContent = ''

    const formData = new FormData(e.target);
    try {
        const res = await fetch('/project', {
            method: 'POST',
            body: formData
        })
        const result = await res.json();
        console.log(result)
        if (result.err) {
            projectNameError.textContent = result.err.projectName
            imageError.textContent = result.err.image
            descriptionError.textContent = result.err.description
        }
        else {
            window.location.assign('/project');
        }

    } catch (err) {
        console.log()
    }
})