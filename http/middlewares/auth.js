module.exports.checkAuth = (req, res, next) => {
    if (!req.session.userid) {
        req.flash('message', 'Você precisa estar logado para acessar esta página.');
        return res.redirect('/login');
    }
    next();
};
