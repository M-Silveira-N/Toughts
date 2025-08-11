const Tought = require('../models/Tought')
const User = require('../models/ManoelUser')

module.exports = class ToughtController {
    static async showToughts(req, res){
        res.render('toughts/home')
    }
}