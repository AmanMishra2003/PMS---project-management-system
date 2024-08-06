//model
const Project = require('../model/projectModel')
const User = require('../model/userModel')

const asyncHandler = require('express-async-handler')
const {handleError} = require('../middleware/handleError')
const {cloudinary} = require('../cloudinary')


module.exports.projectPage = asyncHandler(async(req,res)=>{
    let data;
    const role = res.locals.currentUser.role
    if(role==='manager'){
        data = await Project.find({author: res.locals.currentUser});
    }else{
        data = await Project.find({author: res.locals.currentUser.manager});
    }
        res.render('project/projecthome',{data})
})

module.exports.addProjectForm = (req,res)=>{
    res.render('project/add')
}

module.exports.individualProject = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const data = await Project.findById(id).populate('task');
    const progressBarValue = ((data.task.filter(ele=>ele.completed).length)/data.task.length)*100
    res.render('project/projectpage',{data, progressBarValue})
})

module.exports.addProjectToDatabase = async(req,res)=>{
    try {
        const file = req.files.map(ele=>(
            {
                path : ele.path,
                filename : ele.filename
            }
        ))
        const data = new Project(req.body);
        const user =await User.findById(res.locals.currentUser._id)
        data.author = res.locals.currentUser;
        data.image = [...file]
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

        if(req.body.deleteImages){
            req.body.deleteImages.forEach(async ele=>{
                await cloudinary.uploader.destroy(ele);
            })
            await data.updateOne({$pull : {image : {filename : {$in : req.body.deleteImages}}}})
        }
        if(req.files){
            const img = req.files.map(ele=>(
                {
                    path : ele.path,
                    filename : ele.filename
                }
            ))
            data.image.push(...img)
        }
        await data.save()
        res.status(200).json({id : data.id})
    }catch(error){
        const err = handleError(error)
        res.status(400).json({err});
    }
}

module.exports.deleteProject = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const project = await Project.findById(id);
    project.image.forEach(async (ele)=>{
        await cloudinary.uploader.destroy(ele.filename)
    })
    await Project.findByIdAndDelete(id)
    res.redirect(`/project`)
})
