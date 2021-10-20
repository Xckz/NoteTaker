const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
    readFromFile("./db/json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    console.log(req.body);

    const { title, noteText } = req.body;

    if (req.body) {
        const newNote = {
            title,
            noteText,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Success!`);
    } else {
        res.error("Error: Note was not added.");
    }
});

module.exports = pads;
