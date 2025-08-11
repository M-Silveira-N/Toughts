const express = require('express');
const { engine } = require('express-handlebars'); // Mudança: importação atualizada
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

//Import Models
const Tought = require('./models/Tought')
const User = require('./models/ManoelUser');
const { FORCE } = require('sequelize/lib/index-hints');

//Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//Import Controllers
const ToughtController = require('./controllers/ToughtController')

// Template engine setup - Mudança: nova sintaxe do express-handlebars
app.engine('handlebars', engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// Receber os dados do body das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configurando a sessão
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

//Routes
app.use('/toughts', toughtsRoutes);

app.use('/', authRoutes);

//Controllers
app.get('/', ToughtController.showToughts);

conn
    .sync({FORCE: false})
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });