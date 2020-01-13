const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({
  dest: './uploads'
});
const imageChecker = require('./imageChecker');

const PORT = 1235;
const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/images/:filename', require('./serveFile'));
app.post('/', upload.single('photo'), imageChecker, (req, res) => {
  if (req.file) {
    const src = req.isImageSafe ? `/images/${req.file.filename}` : '/unsafe.jpeg';
    res.render('result', {
      image: src,
      isImageSafe: req.isImageSafe
    });
  } else
    res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});