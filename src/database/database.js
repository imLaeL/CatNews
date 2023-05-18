import Sequelize from 'sequelize';
const database = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/database/database.sqlite'
})

export default database;