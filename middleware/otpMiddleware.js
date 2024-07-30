// Middleware to check OTP session
module.exports = function checkOtpSession(req, res, next) {
    if (req.session.otpVerified) {
        return next();
    }
    res.redirect('/login');
};
