# Byte Length

Calculate the real byte length of any string.

# Why
In node many will use `Buffer.byteLength`, however including the entire buffer shim in the browser just for getting the byte length of a string is not very conservative.

# Installation

#### Npm
```console
npm install byte-length
```

#### Bower
```console
bower install byte-length
```

# Example

```javascript
var byteLength = require('byte-length');

byteLength('hello'); //-> 5
byteLength('😀'); //-> 4
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
