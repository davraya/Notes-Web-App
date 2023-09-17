const noteModel = require('../models/note-model')

async function buildNoteList(accountId){
    let notes = await noteModel.getAllNotesByAccountId(accountId)

    notes = notes.rows


    let noteList = '<ul class="note-list"> '

    notes.forEach(element => {
        const date = new Date(element.note_created)
        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()
        noteList += `<li><span class="note-title">${element.note_title}</span> | Created: ${month}/${day}/${year} <form method="GET" action="/note/single/${element.note_id}"><button type="submit">Open</button></form></li>\n`
    });

    noteList +='</ul>'

    return noteList
}

module.exports = {
    buildNoteList
}

