module.exports = {
    HOST: 'localhost',
    USER: 'desarrollo',
    PASSWORD: null,
    DB: 'dev_demo',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}