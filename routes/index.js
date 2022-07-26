const notes = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');
const uuid = require('../helpers/uuid');

notes.get('/notes', (req, res) => {
    console.log('request for notes')

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})


notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            fs.writeFile('./db/db.json', JSON.stringify(result), (err) => {
                if (err){
                    throw (err)
                }
            } );
            res.json(`Item ${noteId} has been deleted`);
        });
});


notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
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