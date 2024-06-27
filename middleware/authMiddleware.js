function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect ke halaman login jika belum login
    }
    next(); // Lanjutkan ke rute berikutnya jika sudah login
}

module.exports = authMiddleware;
