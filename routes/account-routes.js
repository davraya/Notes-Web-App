const express = require('express')
const accountController = require('../controllers/account-controllers')

router = new express.Router()



router.get('/login', accountController.buildLogin)
router.get('/register', accountController.buildRegister)

router.post('/login', accountController.login)
router.post('/register', accountController.register)

router.get('/logout', accountController.logout)

module.exports = router