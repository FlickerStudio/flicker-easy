const flicker = require('flickerjs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const logger = require('morgan');


let app = flicker();
let homeRouter = require('./routers/home.js');
let usersRouter = require('./routers/users.js');

app.set('template','pug')
    .set('static dir','./public')
    .set('views dir','./views')
//  .set('env','production');
    .add(compress())
    .add(logger('dev'))
//  .add(favicon('./public/favicon.ico'));
    .add(app.serveStatic('./public'))
    .add(bodyParser.json())
    .add(bodyParser.urlencoded({ extended: true }))
    .add(cookieParser());


// inherited in renders
app.locals.year = 2016;

app
    .add(
        (req,res,next) => { // custom middleware
            // inherited in renders
            res.locals.author = "Flicker.js";
            next();
    })
    .add({
        url: '/',
        method: 'GET',
        handler: homeRouter
    })
    .add({
        url: '/users',
        method: 'GET',
        handler: usersRouter
    })
    .add({
        handler: [ // array of handlers
            (req,res,next) => {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            },
            (req,res,next,err) => {
                if(app.get('env') == 'production'){
                    err.stack = "";
                }
                res.status(err.status || 500).render("err",{ title: err.message, error: err});
            }
        ]
    })
    .listen(3000, () => {
        console.log('Running...');
    });
