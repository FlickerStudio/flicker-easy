#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

var version = require('../package.json').version;

var app_name = "";
var app_dir = "";

program
.arguments('<appname> [dir]')
.version(version)
.usage('<appname> [dir]')
.action(function(appname,dir){
    app_name = appname;
    if(dir){
        if(dir[dir.length -1] != '/'){
            dir = dir + "/"
        }
        if(dir[0] == "/"){
            dir = dir.slice(1);
        }
    }
    else{
        dir = "";
    }
    app_dir = dir;
})
.parse(process.argv);


var appjs = loadFile('app.js');
var app_pkg = {
  name: app_name,
  version: "0.0.1",
  main: "app.js",
  scripts: {
    start: "node app.js"
  },
  dependencies: {
    flickerjs: "^0.1.4",
    "body-parser": "^1.15.0",
    colors: "^1.1.2",
    compression: "^1.6.1",
    consolidate: "^0.14.1",
    "cookie-parser": "^1.4.1",
    pug: "latest"
  }
};
/* views */
var errpug = loadFile('views/err.pug');
var indexpug = loadFile('views/index.pug');
var layoutpug = loadFile('views/layout.pug');
/* routers */
var homerouter = loadFile('routers/home.js');
var userrouter = loadFile('routers/users.js');
/* public */
/* public/js */
var indexjs = loadFile('public/js/index.js');
/* public/css */
var stylecss = loadFile('public/css/style.css');

mkdir(app_dir + 'public');
mkdir(app_dir + 'public/js');
mkdir(app_dir + 'public/img');
mkdir(app_dir + 'public/css');
mkdir(app_dir + 'routers');
mkdir(app_dir + 'views',() => {
    Write(app_dir + 'app.js',appjs);
    Write(app_dir + 'package.json',JSON.stringify(app_pkg,null,2));
    /* views */
    Write(app_dir + 'views/err.pug',errpug);
    Write(app_dir + 'views/index.pug',indexpug);
    Write(app_dir + 'views/layout.pug',layoutpug);
    /* routers */
    Write(app_dir + 'routers/home.js',homerouter);
    Write(app_dir + 'routers/users.js',userrouter);
    /* public */
    /* public/js */
    Write(app_dir + 'public/js/index.js',indexjs);
    /* public/css */
    Write(app_dir + 'public/css/style.css',stylecss);
});

function Write(path,str){
    fs.writeFileSync(path,str,{mode: 0666 });
    console.log('   \x1b[36mcreate\x1b[0m : ' + path)
};

function mkdir(dir,cb){
    mkdirp(dir,0755,function(err){
        if(err) throw err;
        console.log('   \x1b[36mcreate\x1b[0m : ' + dir);
        cb && cb();
    });
}

function copy(from, to) {
  from = path.join(__dirname, '..', 'templates', from);
  Write(to, fs.readFileSync(from, 'utf-8'));
}
function loadFile(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}
