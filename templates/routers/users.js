const flicker = require('flickerjs');

var router = flicker().Router();

router
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
           res.render('index',{title: 'Welcome to Flicker.js', message: 'Hello /users'});
        }
    })

module.exports = router;
