const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({
    dest: "./uploads"
});
const imageChecker = require("./imageChecker");

const PORT = 1234;
const app = express();

app.use("/main.css", express.static(path.join(__dirname + '/main.css')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use("/upload", upload.single('photo'), imageChecker);
app.post("/upload", upload.single('photo'), (req, res) => {
    console.log(res.status);
})

app.listen(PORT, () => {
    console.log("server running...");
})