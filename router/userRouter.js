const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

//validate
const {signupValidate,loginValidate} = require('../joi/validate')
const {AuthorizeMiddleware,AuthorizeManager, AuthorizeMember} = require('../middleware/middleware')



router.route('/login')
    .get(userController.loginform)
    .post(loginValidate, userController.login)

router.route('/signup')
    .get(userController.sigupform)
    .post(signupValidate,userController.signup)

router.route('/member/signup')
    .get(AuthorizeMiddleware,AuthorizeManager,userController.memberSignUpForm)
    .post(AuthorizeMiddleware,AuthorizeManager,signupValidate, userController.memberSignUp)


//add member router
router.route('/member')
    .get(AuthorizeMiddleware,AuthorizeManager,userController.teamMember)

router.route('/member/:memberId')
    .delete(AuthorizeMiddleware,AuthorizeManager,userController.removeTeamMember)

//user task route both depending on the user is member of manager
router.route('/tasks')
    .get(
        AuthorizeMiddleware,
        userController.assignedTask
    )


//submission route
router.route('/allsubmission')
    .get(
        AuthorizeMiddleware,
        userController.allSubmission
    )

router.route('/submission/reviews')
    .get(
        AuthorizeMiddleware,
        AuthorizeMember,
        userController.submissionReview
    )

//submission accept route
router.route('/submission/:id/accept')
    .patch(
        AuthorizeMiddleware,
        userController.submissionAccept
    )

//logout route
router.route('/logout')
    .get(userController.logout)


module.exports = router;