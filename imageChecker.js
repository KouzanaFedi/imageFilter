const fs = require('fs');
const request = require('request');
const path = require('path');

apiKey = 'acc_0ff6dad5456ef26';
apiSecret = '18078806cbd0827aeb42a37f82b6b59a';

const imageChecker = (req, res, next) => {
    formData = {
        image: fs.createReadStream(req.file.path)
    }
    request.post({
        url: 'https://api.imagga.com/v2/categories/nsfw_beta',
        formData: formData
    }, (err, response, body) => {
        let json = JSON.parse(body);
        let result = (json.result.categories[0].name.en);
        if (result != 'safe') {
            res.sendFile(path.join(__dirname + '/notSafe.html'));
        }
    }).auth(apiKey, apiSecret, true);
    next();
}

module.exports = imageChecker;