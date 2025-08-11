const User = require('../models/ManoelUser')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res){
        res.render('auth/login');
    }

    static register(req, res){
        res.render('auth/register');
    }

    static async registerPost(req, res){
        const { username, email, password, confirm_password } = req.body;

        // password match validation
        if (password !== confirm_password) {
            req.flash('message', 'A senha e a confirmação não se equivalem, tente novamente')
            return res.render('auth/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.redirect('/login');
    }
}