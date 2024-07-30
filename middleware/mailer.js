const nodemailer = require('nodemailer');

const transporters = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'sigmanggelewa@gmail.com', // Your email address
        pass: 'uwrgcrwqzxjhvguu', // Your email password
    },
});

module.exports = transporters;