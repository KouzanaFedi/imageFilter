const path = require('path');
const fs = require('fs');
module.exports = function(req, res) {
  const pathToImage = path.resolve(__dirname, 'uploads', req.params.filename);
  fs.createReadStream(pathToImage).pipe(res);
};
