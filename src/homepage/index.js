var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var superagent = require('superagent');
var header = require('../header');
var axios = require('axios');

page('/', header, load_pictures_async, function (ctx, next) {
  title('Fotogram - Home');
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.pictures));
});

/* jshint ignore:start */

async function load_pictures_async(ctx, next) {
    try {
        ctx.pictures = await fetch('/api/pictures').then( res => res.json() );
        next();
    }catch (err) {
        return console.log(err);
    }
}

/* jshint ignore:end */

function load_pictures_fetch(ctx, next) {
    fetch('/api/pictures')
        .then(function(res) {
            return res.json();
        })
        .then(function (pictures) {
            ctx.pictures = pictures;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function load_pictures_superagent(ctx, next) {
    superagent.get('/api/pictures')
              .end(function (err,  res) {
                   if (err) return console.log(err);
                   ctx.pictures = res.body;
                   next();
           });
}

function load_pictures_axios(ctx, next) {
    axios.get('/api/pictures')
         .then(function(res) {
             ctx.pictures = res.data;
             next();
         })
         .catch(function (err) {
             console.log(err);
         });
}
