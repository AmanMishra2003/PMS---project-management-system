
const form = document.querySelector('#managerLogin');
const emailError = document.querySelector('#emailError')
const passwordError = document.querySelector('#passwordError')


try {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = form.email.value
        const password = form.password.value
        const result = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await result.json();
        console.log(res)
        if(res.err){
            emailError.textContent = res.err.email
            passwordError.textContent = res.err.password
        }else{
            window.location.assign('/project')
        }

    })
} catch (err) {
    console.log(err)
}
