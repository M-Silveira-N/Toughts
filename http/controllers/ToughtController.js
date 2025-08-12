const Tought = require('../../models/Tought')
const User = require('../../models/ManoelUser')

module.exports = class ToughtController {
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard');
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){

        const tought = {
            title: req.body.title,
            ManoelUserId: req.session.userid
        } 

        try{
            await Tought.create(tought);

            req.flash('message', 'Pensamento criado com sucesso!');
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            console.error('Erro ao criar pensamento:', error);
            req.flash('error', 'Erro ao criar pensamento.');
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        }
    }
}