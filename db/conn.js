const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('clinic_teste', 'clinic_teste', '8DDMgl#ef5XRiwGF', {
    host: '192.168.5.13',
    dialect: 'mysql',
    port: 3306
});

try {
    sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
}

module.exports = sequelize;