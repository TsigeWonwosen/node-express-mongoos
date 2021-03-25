require('dotenv/config');
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');

const PORT = process.env.PORT || 5000;

const { getPosts } = require('./controllers/postController');
const Posts = require('./route/posts');
const Admin = require('./route/admin');
const Converter = require('./route/convert');
const AuthRoute = require('./route/auth');
const MethodOverRide = require('method-override');

require('./models/connection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(MethodOverRide('_method'));

const initializePassport = require('./validation/passport-config');

initializePassport(passport);

app.use(flash());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
  }),
);

app.use(express.static(path.join(__dirname, '/public')));

//Read post from Db
app.get('/', getPosts);

app.use('/convert', Converter);
app.use('/posts', Posts);
app.use('/admin', Admin);
app.use('/auth', AuthRoute);

app.get('*', (req, res) => {
  console.log(req.params);
  res.render('404', { message: req.params });
});

app.listen(PORT, () => {
  console.log('Server is connected!!!');
});
