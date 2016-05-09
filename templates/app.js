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
    .use(compress())
//  .use(favicon('./public/favicon.ico'));
    .use(app.serveStatic('./public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser());


// inherited in renders
app.locals.year = 2016;

app.use(
    (req,res,next) => { // custom middleware
        // inherited in renders
        res.locals.author = "Flicker.js";
        next();
    }
)
    .use('/',homeRouter)
    .use('/users',usersRouter)

    .use(
        (req,res,next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    )

    .use(
        (req,res,next,err) => {
            if(app.get('env') == 'production'){
                err.stack = "";
            }
            res.status(err.status || 500).render("err",{ title: 'Error', error: err});
        }
    )

    .listen(3000);
