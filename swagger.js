const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'SIG Layanan dan Fasilitas API',
        version: '1.0.0',
        description: 'Dokumentasi API untuk mengelola Sistem Informasi Geografis Layanan dan Fasilitas Kecamatan Manggelewa',
    },
    servers: [{
        url: 'https://backend.muhdenisetiawan.my.id', // Sesuaikan dengan URL server Anda
        description: 'Production server',
    }, {
        url: 'http://localhost:3400', // Sesuaikan dengan URL server Anda
        description: 'Development server',
    }, ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path ke file routes Anda
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;