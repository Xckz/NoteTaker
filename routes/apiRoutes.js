const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/api/notes", (req, res) => {
    const notes = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );
    console.log("notes", typeof notes);
    res.json(notes);
});

router.post("/api/notes", (req, res) => {
    const notes = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes)
    );
    res.json(newNote);
});

module.exports = router;
