const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const db = require('./config/database');
const fasilitasPendidikan = require('./routes/fasilitasPendidikan');
const fasilitasKesehatan = require('./routes/fasilitasKesehatan');
const fasilitasKeibadatan = require('./routes/fasilitasKeibadatan');
const fasilitasPemerintah = require('./routes/fasilitasPemerintah');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/Ai');
const authMiddleware = require('./middleware/authMiddleware');
const { runtime } = require('./middleware/func');
const app = express();

// Middleware (misalnya, body-parser, cors, dll.)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'gismgl',
    resave: false,
    saveUninitialized: false,
}));
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Tes koneksi database
(async () => {
    try {
        await db.authenticate();
        console.log('Koneksi ke database berhasil terhubung');

        await db.sync({
            force: false
        });
        console.log('Struktur tabel berhasil disinkronisasi');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();
app.get('/', authMiddleware, (req, res) => {
    const user = req.session.user;
    res.render('user/index', {
        user,
    }); // Sesuaikan path jika diperlukan
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/logout', (req, res) => {
    req.session.destroy(); // Hapus sesi
    res.redirect('/login'); // Redirect ke halaman login
});
app.get('/uptime', (req, res) => {
    const uptime = runtime(process.uptime());
    res.setHeader('Cache-Control', 'no-store');
    res.json({
        uptime
    });
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ai', aiRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/fasilitaspendidikan', fasilitasPendidikan);
app.use('/fasilitaskesehatan', fasilitasKesehatan);
app.use('/fasilitaskeibadatan', fasilitasKeibadatan);
app.use('/fasilitaspemerintah', fasilitasPemerintah);
app.use('/users', usersRoutes);
app.use('/reviews', reviewsRoutes);


const PORT = process.env.PORT || 3400;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));