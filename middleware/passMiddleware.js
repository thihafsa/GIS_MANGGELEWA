module.exports = function checkResetPasswordSession(req, res, next) {
    if (req.session.resetPassword) {
        return next();
    }
    res.redirect('/otp');
};