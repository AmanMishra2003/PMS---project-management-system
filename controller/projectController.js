const Project = require('../model/projectModel')
const asyncHandler = require('express-async-handler')
const {handleError} = require('../middleware/handleError')

// function handleError(err){
//     const error={};
//     console.log(err)
//     if(err.code===11000){
//         if(Object.keys(err.keyValue).includes('projectName')){
//             error['projectName'] = 'Project Name Already Exist'
//         }
//     }
//     return error;
// }


module.exports.projectPage = asyncHandler(async(req,res)=>{
        const data = await Project.find({});
        res.render('project/projecthome',{data})
})

module.exports.addProjectForm = (req,res)=>{
    res.render('project/add')
}

module.exports.individualProject = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const data = await Project.findById(id);
    res.render('project/projectpage',{data})
})

module.exports.addProjectToDatabase = async(req,res)=>{
    try {
        const data = new Project(req.body);
        await data.save();
        res.status(200).json({ msg: 'Project added successfully' });
    } catch (error) {
        const err = handleError(error)
        res.status(400).json({err});
    }
}

module.exports.editProjectForm = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const data = await Project.findById(id);
    res.render('project/edit',{data})
})

module.exports.editProjectToDatabase = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await Project.findByIdAndUpdate(id, req.body , {runValidation : true})
        res.status(200).json({id : data.id})
    }catch(error){
        const err = handleError(error)
        res.status(400).json({err});
    }
}

module.exports.deleteProject = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    await Project.findByIdAndDelete(id)
    res.redirect(`/project`)
})