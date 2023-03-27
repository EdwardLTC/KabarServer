"use strict";
const path = require("path");

module.exports.getConfig = () => {
  const config = {
    MODE: "Development",
    PORT: process.env.PORT || 3000,
    // MONGO_URL: "mongodb+srv://EdwardLTC:admin123@cluster0.e8c4z0e.mongodb.net/?retryWrites=true&w=majority",
    MONGO_URL: "",
    UPLOAD_PATH: path.resolve(`${__dirname}/../public/uploads`),
    UPLOAD_2PIK_PATH: "https://2.pik.vn/",
    JWT_SECRET: "HEHEHHHEHEHEHHEHE",
    FPT_MAIL_ADMIN: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_PROJECT_ID: "",
    GOOGLE_CLIENT_SECRET: "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",
    GOOGLE_REDIRECT_URL: `/cpanel/home/auth_callback`,
    GOOGLE_SCOPE: [],
    COOKIE_TOKEN_LIFETIME: 30 * 24 * 60 * 60 * 1000, // 60 MINUTES IN NANO SECOND
    JWT_TOKEN_LIFETIME: 30 * 24 * 60 * 60, // 60 MINUTES IN SECOND

    //ipconfig
    IPCONFIGSCHOOL: "172.16.101.180",
    IPCONFIGHOME: "192.168.0.141",
  };

  // Modify for Production
  if (process.env.NODE_ENV === "production") {
    config.MODE = "Production";
    config.HOST = `https://fpoly-hcm.herokuapp.com`;
  } else {
    config.HOST = `http://localhost:${process.env.PORT || 3000}`;
  }
  config.GOOGLE_REDIRECT_URL = `${config.HOST}/cpanel/home/auth_callback`;

  return config;
};
