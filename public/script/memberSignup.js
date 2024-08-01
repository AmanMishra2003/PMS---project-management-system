const form = document.querySelector('#memberSignup')
const usernameError = document.querySelector('#usernameError')
const emailError = document.querySelector('#emailError')
const firstnameError = document.querySelector('#firstnameError')
const lastnameError = document.querySelector('#lastnameError')
const passwordError = document.querySelector('#passwordError')



form.addEventListener('submit', async (e) => {
    e.preventDefault();
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    firstnameError.textContent = '';
    lastnameError.textContent = '';

    const username = form.username.value;
    const email = form.email.value;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const password = form.password.value;
    console.log(username)
    console.log(email)
    console.log(firstname)
    console.log(lastname)
    console.log(password)

    try {
        const result = await fetch(`/user/member/signup`,
            {
                method: 'POST',
                body: JSON.stringify({
                    username, email, firstname, lastname, password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            }
        )
        const res = await result.json()
        console.log(res)
        if (res.err) {
            usernameError.textContent = res.err.username;
            emailError.textContent = res.err.email;
            passwordError.textContent = res.err.password;
            firstnameError.textContent = res.err.firstname;
            lastnameError.textContent = res.err.lastname;
        } else {
            window.location.assign('/project')
        }
    } catch (err) {
        console.log(err)
    }

})