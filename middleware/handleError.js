
module.exports.handleError = (err)=>{
    const error={};
    console.log(err)
    if(err.code===11000){
        if(Object.keys(err.keyValue).includes('projectName')){
            error['projectName'] = 'Project Name Already Exist'
        }else if(Object.keys(err.keyValue).includes('username')){
            error['username'] = 'Username Already Exist'
        }else if(Object.keys(err.keyValue).includes('email')){
            error['email'] = 'email Already Exist'
        }
    }
    if(err.message==='User does not exist'){
        error['email'] = 'User Does Not Exist'
    }
    if(err.message==='Incorrect Password!'){
        error['password'] = 'Incorrect Password!'
    }
    
    return error;
}