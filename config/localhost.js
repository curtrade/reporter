const config = {
    mode: 'localhost',
    basicAuth: {
        challenge: true,
        users: { admin: 'password' }
    },
    cron: {
        startJobsOnSystemLoad: false
    },
    web: {
        ip: '127.0.0.1',
        port: 3000,
        protocol: 'http',
        host: 'localhost'
    },
    sequelize: {
        database: '',
        user: '',
        password: '',
        settings: {
            host: 'localhost',
            dialect: 'mysql',
            define: { charset: 'utf8mb4' },
            timezone: '+04:00'
        }
    },
    delivery: {
        file: { basePath: appRoot, folder: 'reports' },
        email: {
            replyTo: '',
            transportSettings: {
                host: 'smtp.mail.ru',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: '',
                    pass: ''
                }
            }
        }
    }
};

module.exports = config;
