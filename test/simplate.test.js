var
	simplate = require('../lib/simplate'),
	assert = require('assert'),
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
	'call with non-existant file fails with error': function() {
		simplate.parse(null, {}, function(error, data) {
			assert.isNotNull(error);
		});
	},
	'parsing an empty file returns zero length string': function() {
		var tmpFilename = createTemplateFile('');
		simplate.parse(tmpFilename, {}, function(error, data) {
			assert.length(data, 0);
			fs.unlink(tmpFilename);
		});
	},
	'parsing a file with one token in replaces correctly': function() {
		var tmpFilename = createTemplateFile('#{TOKEN}');
		simplate.parse(tmpFilename, { TOKEN: 'Hello World'}, function(error, data) {
			assert.strictEqual('Hello World', data);
			fs.unlink(tmpFilename);
		});
	},
	'parsing a file with the same token twice replaces correctly': function() {
		var tmpFilename = createTemplateFile('#{TOKEN}#{TOKEN}');
		simplate.parse(tmpFilename, { TOKEN: 'Hello World'}, function(error, data) {
			assert.strictEqual('Hello WorldHello World', data);
			fs.unlink(tmpFilename);
		});
	},
	'Ensure unmatched tokens are removed': function() {
		var tmpFilename = createTemplateFile('Hello #{TOKEN}');
		simplate.parse(tmpFilename, {}, function(error, data) {
			assert.strictEqual('Hello ', data);
			fs.unlink(tmpFilename);
		});
	},
	'Ensure tokens are case sensitive': function() {
		var tmpFilename = createTemplateFile('Hello #{tOkEn}');
		simplate.parse(tmpFilename, { TOKEN: 'Test'}, function(error, data) {
			assert.strictEqual('Hello ', data);
			fs.unlink(tmpFilename);
		});
	}
};
