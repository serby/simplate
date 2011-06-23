var
	_ = require('underscore'),
	fs = require('fs');

/**
 * Parse a template file and replace #{TOKEN} with the corresponding property from replacements
 *
 * @param {String} filename Path of template file
 * @param {Object} replacements Object where key is the token and value is the replacement
 * @param {Function} callback Called on completion: callback(errors, data)
 */
module.exports.parse = function(filename, replacements, callback) {
	try {
		var response = fs.readFile(filename, function (error, data) {
			if (error) {
				callback(error, null);
				return;
			}
			var content = data.toString();
			var tokens = _.uniq(content.match(/#\{(.+?)\}/g));
			tokens.forEach(function(token) {
				var tokenKey = token.substring(2, token.length - 1);
				replaceWith = '';
				if (replacements[tokenKey]) {
					replaceWith = replacements[tokenKey];
				}
				content = content.replace(new RegExp(token, 'g'), replaceWith);
			});

			callback(null, content);
		});

	} catch (e) {
		callback('Unable to process template: ' + e, null);
	}
};
