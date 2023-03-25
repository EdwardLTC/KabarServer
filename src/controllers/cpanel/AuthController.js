const { AuthService } = require("./../../services/AuthService");
const { Auth } = require("./../../models/Auth");
const { User } = require("./../../models/User");
const autoBind = require("auto-bind");
const bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10,
  authService = new AuthService(
    new Auth().getInstance(),
    new User().getInstance()
  );

class AuthController {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async login(req, res, next) {
    try {
      const response = await this.service.login(
        req.body.username,
        req.body.password
      );
      if (response) {
        res.redirect("/cpanel/articles/");
      } else {
        res.redirect("login");
      }
    } catch (error) {
      res.redirect("login");
    }

    // try {
    //   return await this.service.login(req.body.username, req.body.password);
    // } catch (e) {
    //   throw e;
    // }
  }

  async logout(req, res, next) {
    try {
      const response = await this.service.logout(req.token);
      await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async checkLogin(req, res, next) {
    try {
      const token = this.extractToken(req);
      req.user = await this.service.checkLogin(token);
      req.authorized = true;
      req.token = token;
      next();
    } catch (e) {
      console.log(">>>>. check login: ", e);
      next(e);
    }
  }

  extractToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }
}

module.exports = new AuthController(authService);
