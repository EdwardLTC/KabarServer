const { Controller } = require("../../../system/controllers/Controller");
const { UserService } = require("../../services/UserService");
const { User } = require("../../models/User");
const autoBind = require("auto-bind");
const { HttpResponse } = require("../../../system/helpers/HttpResponse");
const userService = new UserService(new User().getInstance());
const bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

class UserController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  async register(req, res, next) {
    try {
      const data = {
        name: req.body.name || "",
        address: req.body.address || "",
        phone: req.body.phone || "",
        avatar: req.body.avatar || "",
        dob: req.body.dob || new Date(),
        email: req.body.email,
        password: req.body.password,
      };
      const registeredUserData = await this.service.register(data);
      await res.status(200).json(registeredUserData);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const id = req.user._id;
      bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
        if (err) {
          return next(err);
        }
        bcrypt.hash(req.body.password, salt, async (hashErr, hash) => {
          if (hashErr) {
            return next(hashErr);
          }
          const data = { password: hash },
            response = await this.service.update(id, data);
          await res.status(200).json(response);
        });
      });
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const id = req.user._id;
      const data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.body.avatar,
        dob: req.body.dob,
      };
      const response = await this.service.update(id, data);
      await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async sendMail(req, res, next) {
    try {
      const email = req.body.email;
      const subject = "Authentication user";
      const content = `<p>Click <a href="http://localhost:3000/user/confirm-account/${email}">here</a> to authentication your account</p>`;
      const response = await this.service.sendMail(email, subject, content);
      await res.status(200).json(new HttpResponse(response));
    } catch (error) {
      console.log(">>> send mail error", error);
      next(error);
    }
  }

  async confirmAccount(req, res, next) {
    try {
      
    } catch (error) {
      
    }
  }
}

module.exports = new UserController(userService);
