const noteModel =require('../models/note-model')
const util = require('../utilities/index')

async function  buildDashboard(req, res){
    const account_id = req.session.account_id
    notes = await util.buildNoteList(account_id)
    res.render('pages/dashboard', {
        notes: notes
    })
}

function buildCreateNote(req, res){
    res.render('pages/create-note')
}

async function createNote(req, res){
    const {note_title, note_body} = req.body
    const date = new Date()
    const account_id = req.session.account_id
    const result = await noteModel.createNote(note_title, note_body, date, account_id)
   
    
    notes = await util.buildNoteList(account_id)
    res.render('pages/dashboard', {
        notes: notes
    })
}

async function getSingleNote(req, res){
    const note = await noteModel.getNoteById(req.params.id)
    res.render('pages/edit-note',{
        note: note.rows[0],
        note_id: req.params.id
    })
}

async function updateNote(req, res){
    const{note_title, note_body} = req.body
    const result = await noteModel.updateNote(note_title, note_body, req.params.id)
    console.log(result)
    const account_id = req.session.account_id
    notes = await util.buildNoteList(account_id)
    res.render('pages/dashboard', {
        notes: notes
    })
}

async function deleteNote(req, res){
    await noteModel.deleteNote(req.params.id)
    const account_id = req.session.account_id
    notes = await util.buildNoteList(account_id)
    res.render('pages/dashboard', {
        notes: notes
    })
}

module.exports = {
    buildDashboard,
    buildCreateNote,
    createNote,
    getSingleNote,
    updateNote,
    deleteNote
}