const flicker = require('flickerjs');

var router = flicker().Router();

router.get('/',
    (req,res,next) => {
       res.render('index',{title: 'Welcome to Flicker.js', message: 'Hello /users'});
    }
);

module.exports = router;
