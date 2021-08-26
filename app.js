let express = require('express');
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let app = express();
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users')
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost/travels');

let imageStorage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'public/images'),
    filename: (req, file, callback) => callback(null, file.originalname)
})
app.use(multer({ storage: imageStorage }).single('imageFile'));
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})


app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token']

    if(token && auth.checkToken(token)){
        resp.render('admin');
    }
    else{
        resp.redirect('/login');
    }
})
app.get('/login', (req, resp) => {
    resp.render('login');
})
app.listen(3000, () => console.log('Listening 3000...'))