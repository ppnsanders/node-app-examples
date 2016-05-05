var exec = require('child-process-promise').exec;

    exec('cd simple-express-server; npm install;')
        .then(function (result) {
            console.log('simple-express-server NPM packages installed!');
        })
        .catch(function (err) {
            console.log('ERROR while installing NPM packages for simple-express-server');
        });