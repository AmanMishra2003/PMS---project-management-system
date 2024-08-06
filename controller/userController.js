
const jwt = require('jsonwebtoken')
const { handleError } = require('../middleware/handleError')
const asyncHandler = require('express-async-handler')
const { populate } = require('dotenv')
const { formatDate } = require('../middleware/dateFormat')

//models
const User = require('../model/userModel')
const Task = require('../model/taskModel')
const Submission = require('../model/submissionModel')

const maxAge = 24 * 60 * 60

//create JSON web token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, {
        expiresIn: maxAge
    })
}

module.exports.loginform = (req, res) => {
    res.render('auth/login')
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.CompareAndLogin(email, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id })

    } catch (error) {
        const err = handleError(error)
        res.status(400).json({ err })
    }
}

module.exports.sigupform = (req, res) => {
    res.render('auth/signup')
}

module.exports.memberSignUpForm = (req, res) => {
    res.render('auth/membersignup')
}

module.exports.signup = async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        const user = new User({ username, password, firstname, lastname, email, role: 'manager' })
        await user.save();
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(200).json({ user: user._id })
    } catch (error) {
        const err = handleError(error)
        res.status(400).json({ err })
    }
}

module.exports.memberSignUp = async (req, res) => {
    try {
        const id = res.locals.currentUser._id
        const manager = await User.findById(id)
        const { username, password, firstname, lastname, email } = req.body;
        const user = new User({ username, password, firstname, lastname, email, role: 'teammember' })
        user.manager = manager
        manager.member.push(user)
        await manager.save()
        await user.save();
        res.status(200).json({ user: user._id })
    } catch (error) {
        const err = handleError(error)
        res.status(400).json({ err })
    }
}

module.exports.teamMember = asyncHandler(async (req, res) => {
    const id = res.locals.currentUser._id;
    const manager = await User.findById(id).populate('member');
    res.render('auth/allteamMember', { manager })
})

module.exports.removeTeamMember = asyncHandler(async (req, res) => {
    const { memberId } = req.params;
    const id = res.locals.currentUser._id;
    const manager = await User.findById(id);
    const member = await User.findById(memberId)
    manager.member.pull(member)
    await manager.save();
    await User.findByIdAndDelete(memberId)
    res.redirect('/user/member')
})

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: '1' })
    res.redirect('/')
}

module.exports.assignedTask = async (req, res) => {
    const role = res.locals.currentUser.role;
    let task;
    if (role === 'manager') {
        task = await Task.find({
            author: res.locals.currentUser
        }).populate('assignTo').populate('project')
    } else {
        task = await Task.find({
            assignTo: res.locals.currentUser
        }).populate(['project', 'author'])
    }
    res.render('task/assignedTasks', { task })
}

module.exports.allSubmission = asyncHandler(async (req, res) => {
    submissions = await Submission.find({}).populate([
        {
            path: 'task',
            populate: [
                {
                    path: 'assignTo'
                },
                {
                    path: 'project'
                }
            ]
        },
    ]);
    const submissionInDateOrder = Object.groupBy(submissions, (({ submissionDate }) => formatDate(submissionDate)))
    res.render('submission/showSubmission', { submissionInDateOrder, formatDate })
})

module.exports.submissionReview = asyncHandler(async (req, res) => {
    const submission = await Submission.find({
        author: res.locals.currentUser,
        $expr: { $gt: [{ $size: '$review' }, 0] }
    }
    ).populate({
        path: 'task',
        populate: {
            path: 'project'
        }
    });
    res.render('submission/submissionReview.ejs', { submission })
})

module.exports.submissionAccept = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const submission = await Submission.findById(id).populate({path:'task',
        populate:{
            path:'project'
        }
    })
    submission.accepted=true;
    submission.task.completed =true;
    await submission.task.save()
    await submission.save();
    res.redirect(`/project/${submission.task.project._id}`)
})