const sessionDetails = {
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date(Date.now() + 7*24*60*60*1000),
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};
module.exports = sessionDetails;