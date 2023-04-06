"use strict";
const path = require("path");

module.exports.getConfig = () => {
  const config = {
    MODE: "Development",
    PORT: process.env.PORT || 3000,
    MONGO_URL: "mongodb://127.0.0.1:27017/Kabar",
    UPLOAD_PATH: path.resolve(`${__dirname}/../public/uploads`),
    UPLOAD_2PIK_PATH: "https://2.pik.vn/",
    JWT_SECRET: "HEHEHHHEHEHEHHEHE",
    FPT_MAIL_ADMIN: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_PROJECT_ID: "",
    GOOGLE_CLIENT_SECRET: "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",
    GOOGLE_REDIRECT_URL: `/cpanel/home/auth_callback`,
    GOOGLE_SCOPE: [],
    COOKIE_TOKEN_LIFETIME: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    JWT_TOKEN_LIFETIME: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    /**
     * 3: days
     * 24: hours/1d
     * 60: minutes/1h
     * 60: seconds/1m
     * 1000: milliseconds/1s
     */

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
