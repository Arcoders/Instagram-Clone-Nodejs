
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

    res.send(pictures);
});

app.post('/api/pictures', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.send(500, 'Error uploading file');
        }
        res.send('File uploaded successfully');
    });
});

app.get('/api/user/:username', function (req, res) {
    const user = {
        username: 'Ismael_Haytam',
        avatar: 'https://avatars2.githubusercontent.com/u/26773339?v=3&s=460',
        pictures: [
            {
                id: 1,
                src: 'https://s-media-cache-ak0.pinimg.com/originals/0c/83/c9/0c83c92bddf0e94ac8ebea6dc0c468a2.jpg',
                likes: 7
            },
            {
                id: 2,
                src: 'https://4.bp.blogspot.com/-5DZTR-AAZ5o/Vyih_PCwdVI/AAAAAAAAXy8/tXYD47RQ-rgRx97PMDJUSJucHOXuBGbkQCLcB/s1600/2016-spofec-rolls-royce-wraith-0.jpg',
                likes: 10
            },
            {
                id: 3,
                src: 'https://www.lamborghini.com/es-en/sites/es-en/files/DAM/lamborghini/model/huracan/huracan-avio/left.jpg',
                likes: 24
            }
        ]
    }
    res.send(user);
});

app.get('/:username', function (req, res) {
    res.render('index', { title: `Fotogram - ${req.params.username}` });
});

app.listen(3000, function (err) {
    if (err) return console.log('Hubo un error'), process.exit(1);
    console.log('Fotogram escucando en el puerto 3000 .............. ');
});
