const fs = require('fs');
const fetch = require('request');

const imageChecker = (req, res, next) => {
  const options = {
    url: 'https://francecentral.api.cognitive.microsoft.com/vision/v2.1/analyze',
    qs: {
      visualFeatures: 'Adult',
      details: '',
      language: 'en'
    },
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'f0596e6306724721be9a9aa4ec30bcfd'
    },
    body: fs.readFileSync(req.file.path)
  };
  fetch.post(options, (err, res, body) => {

    if (err) return res.status(500).send(err);
    body = JSON.parse(body);
    if (!body.adult.isAdultContent && !body.adult.isRacyContent && !body.adult.isGoryContent) {
      req.isImageSafe = true;
    } else
      req.isImageSafe = false;
    return next();
  });
};
module.exports = imageChecker;