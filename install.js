var exec = require('child-process-promise').exec;

	exec('npm install;')
	.then(function (result0) {
		console.log('node-app-examples NPM packages installed!');
		exec('cd simple-express-server; npm install;')
        .then(function (result1) {
            console.log('simple-express-server NPM packages installed!');
            //!!!!!this must bet the last call after ALL npm/bower installs are complete.!!!!!
            //with only one install, this is obvious, it will get more complex when multiple installs are running.
            console.log('///Now run the command "node setup.js" in the terminal');
        })
        .catch(function (err) {
            console.log('ERROR while installing NPM packages for simple-express-server');
        });
	})
	.catch(function (err) {
		console.log('ERROR while installing NPM packages for node-app-examples');
	});
    