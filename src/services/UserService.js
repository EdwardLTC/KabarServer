"use strict";
const { Service } = require("../../system/services/Service");
const autoBind = require("auto-bind");
const mailer = require("nodemailer");

const transporter = mailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lethanhcong06062003@gmail.com",
    pass: "wejlloxfrtvlhmfg",
  },
});

class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }

  async register(data) {
    try {
      return await super.insert(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param email : string
   * @param includePassword : boolean
   * @returns {Promise<*>}
   */
  async findByEmail(email, includePassword = false) {
    return includePassword
      ? this.model.findByEmail(email).select("+password")
      : this.model.findByEmail(email);
  }

  async sendMail(to, subject, content) {
    try {
      const mailOptions = {
        from: "Edward <lethanhcong06062003@gmail.com>",
        to,
        subject,
        html: content,
      };
      const res = await transporter.sendMail(mailOptions);
      return new HttpResponse(res);
    } catch (e) {
      console.log("something went wrong", e);
    }

    return false;
  }
}

module.exports = { UserService };
