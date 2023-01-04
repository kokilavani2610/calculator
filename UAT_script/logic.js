const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
const newman = require('newman'); // require newman in your project
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const pdf = require('html-pdf');
	
// Converts value to lowercase
function activateProxy(sabisusername, sabispassword) {
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 process.env.http_proxy = "http://U778541:KOKIRagv2631@cache.bancsabadell.com:8080";
 process.env.https_proxy = "https://U778541:KOKIRagv2631@cache.bancsabadell.com:8080";
}



// Return only base file name without dir
function getMostRecentFileName(dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

function renameMostRecentFileName(dir, environment, wellnessUsed) {
	var filename = getMostRecentFileName('./newman').replace('newman-run-report-', 'mobile-wellness-' + environment + '-' + wellnessUsed + '-');
	fs.rename('./newman/' + getMostRecentFileName('./newman'), './newman/' + filename, function (err) {
	  if (err) throw err;
	  console.log('renamed complete');
	});
}

function sendemail(filepath, address) { 
	// Require'ing module and setting default options	 
	var send = require('gmail-send')({
	//var send = require('../index.js')({
	  user: 'device.lab.sabis.tsb',
	  // user: credentials.user,                  // Your GMail account used to send emails
	  pass: 'devicepassword2016',
	  // pass: credentials.pass,                  // Application-specific password
	  to:   address,
	  // to:   credentials.user,                  // Send to yourself
	                                           // you also may set array of recipients:
	                                           // [ 'user1@gmail.com', 'user2@gmail.com' ]
	  // from:    credentials.user,            // from: by default equals to user
	  // replyTo: credentials.user,            // replyTo: by default undefined
	  // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
	  //subject: 'wellness',
	  //text:    'gmail-send example 1',         // Plain text
	  //html:    '<b>html text</b>'            // HTML
	});
	 	 
	// Override any default option and send email	 	 
	send({ // Overriding default parameters
	  subject: 'Mobile App Wellness - attached ' + filepath,         // Override value set as default
	  files: [ filepath ],
	}, function (err) {
	  if (err) { throw err; }

	  console.log('email sent to ' + address);
	});	
}

/**
 * @function  [addContact]
 * @returns {String} Status
 */
const runwellness = (environment, wellnessToUse, sabisusername, sabispassword, emailtosendresults) => {
	activateProxy(sabisusername, sabispassword);


	// call newman.run to pass `options` object and wait for callback
	newman.run({
		collection: require('./T3 Wellness.postman_collection.json'),
		//folder: "FULL WELLNESS",
		//folder: "FULL WELLNESS V2 Services",
		folder: wellnessToUse,
		//collection: require('./shortwellness.postman_collection.json'),		
		environment: require('./' + environment + '.json'),
		reporters: ['cli','htmlextra']
	}, function (err) {
		console.trace('Error ',err);
		if (err) { throw err; }

		console.log('collection run complete!');
		renameMostRecentFileName('./newman/', environment, wellnessToUse)
		//sendemail('./newman/' + getMostRecentFileName('./newman'), emailtosendresults);
	});	
};

// Export all methods
module.exports = { runwellness };