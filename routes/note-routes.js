const express = require('express')
router = new express.Router()
const noteController = require('../controllers/note-controllers')
const jwt = require('../jwt/index')


router.get('/single/:id', jwt.verifyToken, noteController.getSingleNote)
router.post('/update/:id',jwt.verifyToken, noteController.updateNote)

router.get('/dashboard', jwt.verifyToken, noteController.buildDashboard)
router.get('/create', jwt.verifyToken, noteController.buildCreateNote)

router.post('/create', jwt.verifyToken, noteController.createNote)

router.post('/delete/:id', jwt.verifyToken, noteController.deleteNote)


module.exports = router