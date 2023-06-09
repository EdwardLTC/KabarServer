const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const jwt = require("jsonwebtoken"),
  config = require("../../config/config").getConfig(),
  jwtKey = config.JWT_SECRET,
  jwtExpirySeconds = config.JWT_TOKEN_LIFETIME;

class Auth {
  static instance = null;
  initSchema() {
    const schema = new Schema(
      {
        token: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        // expiry: {
        //   type: Date,
        //   default: Date.now() + jwtExpirySeconds, // jwt expiry time
        //   default: Date.now() + 10000, // 10 seconds
        //   required: false,
        // },
      },
      { timestamps: true }
    );

    // schema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

    schema.statics.generateToken = async function (user) {
      // Create a new token with the user details
      try {
        const token = jwt.sign(
          {
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
            address: user.address,
            phone: user.phone,
            avatar: user.avatar,
          },
          jwtKey,
          {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          }
        );

        return token;
      } catch (e) {
        throw e;
      }
    };

    schema.statics.decodeToken = async function (token) {
      // Create a new token with the user details
      try {
        return jwt.verify(token, jwtKey);
      } catch (e) {
        throw e;
      }
    };

    try {
      mongoose.model("auth", schema);
    } catch (e) {}
  }

  getInstance() {
    if (!Auth.instance) {
      this.initSchema();
      Auth.instance = mongoose.model("auth");
    }
    return Auth.instance;
  }
}

module.exports = { Auth };
