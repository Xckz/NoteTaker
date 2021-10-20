const express = require("express");
const path = require("path");
const fsUtils = require("./db/fsUtils");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes.js");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
    fsUtils.getAllNotes((data) => {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fsUtils.addNote(req.body, (newNote) => {
        res.json(newNote);
    });
});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
