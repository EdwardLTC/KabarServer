const jwt = require("jsonwebtoken");
const config = require("../../config/config").getConfig();

const checkTokens = (req, res, next) => {
  const { session } = req;
  const url = req.originalUrl.toLowerCase();
  if (!session) {
    if (url.includes("/cpanel/auth/login")) {
      return next();
    } else {
      return res.redirect("/cpanel/auth/login");
    }
  } else {
    const { token } = req.session;
    if (!token) {
      if (url.includes("/cpanel/auth/login")) {
        return next();
      } else {
        return res.redirect("/cpanel/auth/login");
      }
    } else {
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (url.includes("/cpanel/auth/login")) {
            return next();
          } else {
            return res.redirect("/cpanel/auth/login");
          }
        } else {
          if (url.includes("/cpanel/auth/login")) {
            return res.redirect("/cpanel/articles/");
          } else {
            return next();
          }
        }
      });
    }
  }
};

module.exports = { checkTokens };
