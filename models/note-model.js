const pool = require('../database/index')


async function createNote(note_title, note_body, note_created, account_id){
    try{
        const sql = 'INSERT INTO notes(note_title, note_body, note_created, account_id) VALUES ($1, $2, $3, $4) RETURNING *'
        return await pool.query(sql, [note_title, note_body, note_created, account_id])
    } catch (err){
        return err.message
    }
}

async function getAllNotesByAccountId(account_id){
    try {
        const sql = 'SELECT note_title, note_body, note_created, note_id FROM notes WHERE account_id = $1 ORDER BY note_created ASC'
        return await pool.query(sql, [account_id])
    }catch(error){
        return error.message
    }
}

async function getNoteById(note_id){
    try {
        const sql = 'SELECT note_title, note_body FROM notes WHERE note_id = $1'
        return await pool.query(sql, [note_id])
    }catch(error){
        return error.message
    }
}

async function updateNote(note_title, note_body, note_id){
     try {
        const sql = 'UPDATE notes SET note_title = $1, note_body = $2 WHERE note_id = $3 RETURNING *'
        return await pool.query(sql, [note_title, note_body, note_id])
    }catch(error){
        return error.message
    }
}

async function deleteNote(note_id){
    try{
        const sql = 'DELETE FROM notes WHERE note_id = $1'
        return await pool.query(sql, [note_id])
    }catch(error){
        return error.message
    }
}

module.exports = {
    createNote,
    getAllNotesByAccountId,
    getNoteById,
    updateNote,
    deleteNote
}