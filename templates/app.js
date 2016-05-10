const flicker = require('flickerjs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');


let app = flicker();
let homeRouter = require('./routers/home.js');
let usersRouter = require('./routers/users.js');

app.set('template','pug')
    .set('static dir','./public')
    .set('views dir','./views')
//  .set('env','production');
    .to(compress())
//  .to(favicon('./public/favicon.ico'));
    .to(app.serveStatic('./public'))
    .to(bodyParser.json())
    .to(bodyParser.urlencoded({ extended: true }))
    .to(cookieParser());


// inherited in renders
app.locals.year = 2016;

app.to(
    (req,res,next) => { // custom middleware
        // inherited in renders
        res.locals.author = "Flicker.js";
        next();
    }
)
    .to({ url: '/', method: 'GET'},homeRouter)
    .to({ url: '/users', method: 'POST'},usersRouter)

    .to(
        (req,res,next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    )

    .to(
        (req,res,next,err) => {
            if(app.get('env') == 'production'){
                err.stack = "";
            }
            res.status(err.status || 500).render("err",{ title: 'Error', error: err});
        }
    )

    .listen(3000);
