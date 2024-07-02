function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role !== 'Admin') {
         return res.redirect('/');
    }
    next(); // Lanjutkan ke rute berikutnya jika memiliki akses yang sesuai
}

module.exports = isAdmin