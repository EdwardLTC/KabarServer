const jwt = require("jsonwebtoken");
const config = require("../../config/config").getConfig();

const checkTokens = (req, res, next) => {
  const { section } = req;
  const url = req.originalUrl.toLowerCase();

  if (!section) {
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
            next();
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

const checkTokenWeb = (req, res, next) => {};

module.exports = { checkTokens, checkTokenWeb };
