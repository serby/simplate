# simplate - Lightweight async template parser

[![build status](https://secure.travis-ci.org/serby/simplate.png)](http://travis-ci.org/serby/simplate) [![Greenkeeper badge](https://badges.greenkeeper.io/serby/simplate.svg)](https://greenkeeper.io/)

A super lightweight async template parser for nodejs

## Installation

	$ npm install simplate

## Usage

File: fileToParse.txt:

    Hello #{NAME}

Code:

```js

var fileToParse = 'fileToParse.txt'
  , simplate = require('simplate');

simplate.parse(fileToParse, { NAME: 'Jim'}, function(error, content) {
  console.log(content); // Will output "Hello Jim"
});

```

## Credits
[Paul Serby](https://github.com/serby/) follow me on [twitter](http://twitter.com/PabloSerbo)

[Adam Duncan](https://github.com/aduncan88/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
