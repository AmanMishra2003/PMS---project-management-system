//models
const Task = require('../model/taskModel')
const Project = require('../model/projectModel')
const User = require('../model/userModel')

//middlwares
const asyncHandler = require('express-async-handler')
const {handleError} = require('../middleware/handleError')
const {cloudinary} = require('../cloudinary')
const {formatDate} = require('../middleware/dateFormat')



module.exports.tasks = (req,res)=>{
    // res.render('task/tasks.ejs')
    res.send('task apge')
}

module.exports.assignTaskPage = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    //fetching user and populating to get TeamMembers
    const user = await User.findById(res.locals.currentUser._id).populate('member')
    res.render('task/add.ejs',{user,id : projectId});
})

module.exports.addTaskToDatabase = async(req,res)=>{
    try{
        const {projectId} = req.params;
        const project = await Project.findById(projectId);
        const task = new Task({
            taskName : req.body.taskName,
            description : req.body.description,
            deadline : req.body.deadline,
            completed: false,
            dataAdded: new Date(Date.now())
        });

        const memberTaskedAssignedTo = await User.findById(req.body.assignTo);

        if(req.files){
            req.files.forEach(ele=>{
                task.image.push({
                    path : ele.path,
                    filename : ele.filename
                })
            })
        }
        task.assignTo = memberTaskedAssignedTo;
        task.author = res.locals.currentUser;
        task.project = project;

        project.task.push(task);
        await project.save();
        await task.save();

        res.status(200).json({msg:task._id})

    }catch(error){
        const err = handleError(error)
        res.status(400).json({err})
    }
}

module.exports.singleTaskPage = async(req,res)=>{
    const {projectId,id} = req.params;
    const taskData = await Task.findById(id).populate('assignTo').populate('author');
    res.render('task/show.ejs',{taskData,projectId})
}

module.exports.editTaskForm = asyncHandler(async(req,res)=>{
    const {projectId, id} = req.params;
    const task = await Task.findById(id)
    const user = await User.findById(res.locals.currentUser._id).populate('member')
    res.render('task/edit.ejs',{projectId, task, user,formatDate})
})

module.exports.editTask = async(req,res)=>{
    try{
        const {projectId, id} = req.params;
        const personTaskAssignTo = await User.findById(res.locals.currentUser._id)
        const updatedTask = await Task.findByIdAndUpdate(id, req.body,{runValidation:true})

        //deleteing image from cloud and inserting new ones
        if(req.body.deleteImages){
            req.body.deleteImages.forEach(async(ele)=>{
                await cloudinary.uploader.destroy(ele)
            })
            await updatedTask.updateOne({$pull :{image : {filename : {$in : req.body.deleteImages}}}})
        }
        if(req.files){
            req.files.forEach(async(ele)=>{
                await updatedTask.image.push({
                    path :ele.path,
                    filename : ele.filename
                })
            })
        }
        updatedTask.assignTo = personTaskAssignTo
        await updatedTask.save()
        
        res.status(200).json({msg:updatedTask.id})
    }catch(error){
        const err = handleError(error)
        res.status(200).json({err})
    }
}

module.exports.deleteTask = async(req,res)=>{
    const {projectId,id} = req.params; 
    const task = await Task.findById(id);
    const project = await Project.findById(projectId);

    if(task.image){
        task.image.forEach(async(ele)=>{
            await cloudinary.uploader.destroy(ele.filename)
        })
    }

    project.task.pull(task);
    await project.save();
    await Task.findByIdAndDelete(id);
    res.redirect(`/project/${projectId}/tasks`)
}