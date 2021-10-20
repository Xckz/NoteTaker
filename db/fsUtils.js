const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const getAllNotes = (cb) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        cb(data);
    });
};

const addNote = (note, cb) => {
    const newNote = {
        title: note.title,
        text: note.text,
        id: uuid(),
    };

    getAllNotes((notes) => {
        const existingNotes = JSON.parse(notes);
        const newData = [...existingNotes, newNote];

        fs.writeFile("db/db.json", JSON.stringify(newData, null, 2), (err) => {
            cb(newNote);
        });
    });
};

const deleteNote = (id, cb) => {
    getAllNotes((notes) => {
        const filteredNotes = JSON.stringify(
            JSON.parse(notes).filter((note) => note.id !== id)
        );
        fs.writeFile("db/db.json", filteredNotes, (err) => {
            cb(filteredNotes);
        });
    });
};

module.exports = {
    getAllNotes,
    addNote,
    deleteNote,
};
