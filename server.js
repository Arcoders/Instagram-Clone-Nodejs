
var express = require('express');
var multer = require('multer');
var file_extension = require('file-extension');

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads');
        },
        filename: function(req, file, cb) {
            cb(null, +Date.now() + '.' + file_extension(file.originalname));
        }
});

var upload = multer({storage: storage}).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    res.render('index');
});

app.get('/signin', function (req, res) {
    res.render('index');
});

app.get('/api/pictures', function(req, res){
    var pictures = [
      {
        user: {
          username: 'Ismael Haytam',
          avatar: 'ismael-haytam-avatar.jpg'
        },
        url: 'office.jpg',
        likes: 0,
        liked: false,
        createdAt: new Date()
      },
      {
        user: {
          username: 'Kadm Saher',
          avatar: 'kadem-saher-avatar.jpg'
        },
        url: 'kadem-saher.jpg',
        likes: 1,
        liked: true,
        createdAt: new Date().setDate(new Date().getDate() - 20)
      }
    ];
    setTimeout(function () {
        res.send(pictures);
    }, 2000);
});

app.post('/api/pictures', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.send(500, 'Error uploading file');
        }
        res.send('File uploaded successfully');
    });
});

app.listen(3000, function (err) {
    if (err) return console.log('Hubo un error'), process.exit(1);
    console.log('Fotogram escucando en el puerto 3000 .............. ');
});
