[![logo](/assets/flickerjs.png)](https://www.npmjs.com/package/flickerjs)

Flickerjs Apps generator ( for [Flicker.js](https://github.com/flickerstudio/flickerjs) web framework for [node.js](http://nodejs.org/))
```javascript
const flicker = require('flickerjs');
var app = flicker();
app
    .add({
    url: '/',
    handler: (req, res) => {
        res.send('Hello Flicker.js');
        }
    })
    .listen(3000);

```

Usage
====
```
$ flickerjs myapp
```
Or
```
$ flicker todolist /mydir
$ cd mydir
```

