# piton-simplate - Light weight template parser

A super light weight async template parser for nodejs

## Installation

	$ npm install piton-simplate

## Usage

File: fileToParse.txt:

	Hello #{NAME}

Code:

	var fileToParse = 'fileToParse.txt';
	simplate.parse(fileToParse, { NAME: 'Jim'}, function(error, content) {
		console.log(content); // Will output "Hello Jim"
	});

## Credits
[Paul Serby](https://github.com/serby/)
[Adam Duncan](https://github.com/aduncan88/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
