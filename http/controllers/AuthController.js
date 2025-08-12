const User = require('../../models/ManoelUser')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res){
        res.render('auth/login');
    }

    static async loginPost(req, res){

        const { email, password } = req.body

        // find user
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('message', 'Usuário não encontrado.');
            return res.render('auth/login');
        }

        // check password match
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            req.flash('message', 'Senha incorreta.');
            return res.render('auth/login');
        }

        // initialize session
        req.session.userid = user.id;

        req.flash('message', 'Login realizado com sucesso!');
        req.session.save(() => {
            res.redirect('/');
        });
    }

    static register(req, res){
        res.render('auth/register');
    }

    static async registerPost(req, res){
        const { name, email, password, confirm_password } = req.body;

        // password match validation
        if (password !== confirm_password) {
            req.flash('message', 'A senha e a confirmação não se equivalem, tente novamente')
            return res.render('auth/register');
        }

        //check if user exists
        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
            req.flash('message', 'Este e-mail já está em uso');
            return res.render('auth/register');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        };

        try{
            const createdUser = await User.create(user);

            //initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Conta criada com sucesso! Você já pode fazer login.');

            req.session.save(() => {
                res.redirect('/')
            })
        }catch(error){
            console.error("Error creating user:", error);
            req.flash('message', 'Houve um erro ao criar sua conta, tente novamente mais tarde. ');
            return res.render('auth/register');
        }
        
    }

    static logout(req, res){
        req.session.destroy();
        res.redirect('/login');
    }   
}