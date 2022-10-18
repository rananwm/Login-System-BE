const router = require('express').Router()
const authController = require("./authController")

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/isUser', authController.isUser)

module.exports = router;