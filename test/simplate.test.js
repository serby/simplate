var
	simplate = require('../../piton-simplate'),
	fs = require('fs');

function createTemplateFile(content) {
	// This isn't a very good way to generate random file names.
	var tmpFilename = '/tmp/simplate-test-' + Math.round(Math.random() * 10000000);
	var fd = fs.openSync(tmpFilename, 'w');
	fs.writeSync(fd, content);
	fs.close(fd);
	return tmpFilename;
}

describe('simplate', function() {

	describe('#parse()', function() {

		it('with non-existant file fails with error', function(done) {
			simplate.parse(null, {}, function(error, data) {
				error.should.not.equal(null);
				done();
			});
		});

		it('parsing an empty file returns zero length string', function(done) {
			var tmpFilename = createTemplateFile('');
			simplate.parse(tmpFilename, {}, function(error, data) {
				data.should.have.length(0);
				fs.unlink(tmpFilename);
				done();
			});
		});

		it('parsing a file with one token in replaces correctly', function(done) {
			var tmpFilename = createTemplateFile('#{TOKEN}');
			simplate.parse(tmpFilename, { TOKEN: 'Hello World'}, function(error, data) {
				data.should.equal('Hello World');
				fs.unlink(tmpFilename);
				done();
			});
		});

		it('parsing a file with the same token twice replaces correctly', function(done) {
			var tmpFilename = createTemplateFile('#{TOKEN}#{TOKEN}');
			simplate.parse(tmpFilename, { TOKEN: 'Hello World'}, function(error, data) {
				data.should.equal('Hello WorldHello World');
				fs.unlink(tmpFilename);
				done();
			});
		});

		it('ensures unmatched tokens are removed', function(done) {
			var tmpFilename = createTemplateFile('Hello #{TOKEN}');
			simplate.parse(tmpFilename, {}, function(error, data) {
				data.should.equal('Hello ');
				fs.unlink(tmpFilename);
				done();
			});
		});

		it('ensures tokens are case sensitive', function(done) {
			var tmpFilename = createTemplateFile('Hello #{tOkEn}');
			simplate.parse(tmpFilename, { TOKEN: 'Test'}, function(error, data) {
				data.should.equal('Hello ');
				fs.unlink(tmpFilename);
				done();
			});
		});

	});

});