const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// Template engine setup
app.engine('handlebars', exphbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// Receber os dados do body das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// Flash Messages
app.use(flash());

//public path
app.use(express.static('public'));

// set session to response
app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next();
})

conn
    .sync()
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });