var
	simplate = require('../lib/simplate'),
	assert = require('assert'),
	async = require('async'),
	fs = require('fs');

function createTemplateFile(content) {
	// This isn't a very good way to generate random file names.
	var tmpFilename = '/tmp/simplate-test-' + Math.round(Math.random() * 10000000);
	var fd = fs.openSync(tmpFilename, 'w');
	fs.writeSync(fd, content);
	fs.close(fd);
	return tmpFilename;
}

module.exports = {
	'parse 5000 templates': function() {
		var content = '';
		for (var i = 0; i < 10000; i += 1) {
			content +=  'XXXXX #{TOKEN} ZZZZZZZ - ';
		}

		var tmpFilename = createTemplateFile(content);

		var count = 0;
		async.whilst(function () { return count < 10000; }, function(callback) {
			count++;
			simplate.parse(tmpFilename, { TOKEN: '12345678'}, function(error, data) {
				assert.strictEqual(content.length, data.length);
				callback();
			});
		}, function(error) {
			console.log(count, error);
			fs.unlink(tmpFilename);
		});
	}
};