const notes = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');
const uuid = require('../helpers/uuid');

notes.get('/notes', (req, res) => {
    console.log('request for notes')

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if( title && text ) {
        const newNote = {
            title,
            text,
            id: uuid()
        }

        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'success',
            body: newNote
        }

        res.json(response)
    } else {
        console.log(error)
    }
})

module.exports = notes;