
    module.exports.ensureAuthenticated = function (req, res, next) {
      if (true) {
            return next();
       }
        return res.redirect('/login');
    }
