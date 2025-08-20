const Tought = require('../../models/Tought')
const User = require('../../models/ManoelUser')

module.exports = class ToughtController {
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        })

        if(!user){
            req.flash('error', 'Usuário não encontrado.');
            req.session.save(() => {
                res.redirect('/login');
            })
        }

        const toughts = user.Toughts.map((result) => result.dataValues);

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts });
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

    static async removeTought(req, res){
        
        const id = req.body.id
        const userId = req.session.userid

        try {
            await Tought.destroy({
                where: {
                    id,
                    ManoelUserId: userId
                }
            })

            req.flash('message', 'Pensamento removido com sucesso!');
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            console.error('Erro ao remover pensamento:', error);
            req.flash('error', 'Erro ao remover pensamento.');
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        }
    }
}