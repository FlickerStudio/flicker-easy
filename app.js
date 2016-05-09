const flicker = require('flickerjs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');


let app = flicker();
let homeRouter = require('./routers/home.js');
let usersRouter = require('./routers/users.js');

app.set('template','pug');
app.set('static dir','./public');
app.set('views dir','./views');
//app.set('env','production');
app.use(compress());
//app.use(favicon('./public/favicon.ico'));
app.use(app.serveStatic('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// inherited in renders
app.locals.year = 2016;

app.use(
    (req,res,next) => { // custom middleware
        // inherited in renders
        res.locals.author = "Flicker.js";
        next();
    }
);

app.use('/',homeRouter);
app.use('/users',usersRouter);

app.use(
    (req,res,next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
);

app.use(
    (req,res,next,err) => {
        if(app.get('env') == 'production'){
            err.stack = "";
        }
        res.status(err.status || 500).render("err",{ title: 'Error', error: err});
    }
);

app.listen(3000);
