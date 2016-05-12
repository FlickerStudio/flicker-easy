const flicker = require('flickerjs');

var router = flicker().Router();

router
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
           res.render('index',{title: 'Welcome to Flicker.js', message: 'FlickerJS is Running'});
        }
    })

module.exports = router;
