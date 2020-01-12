const fs = require('fs');
const fetch = require('request');
apiKey = 'acc_0ff6dad5456ef26';
apiSecret = '18078806cbd0827aeb42a37f82b6b59a';

const imageChecker = (req, res, next) => {
  const formData = { image: fs.createReadStream(req.file.path) };
  fetch
    .post(
      'https://api.imagga.com/v2/categories/nsfw_beta',
      { formData },
      (error, _, body) => {
        if (error) return res.status(500).send(error);
        body = JSON.parse(body);
        req.isImageSafe = body.result.categories[0].name.en === 'safe';
        return next();
      }
    )
    .auth(apiKey, apiSecret, true);
};
module.exports = imageChecker;
