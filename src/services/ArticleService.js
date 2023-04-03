"use strict";
const { Service } = require("../../system/services/Service");
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const autoBind = require("auto-bind");
const { Article } = require("../models/Article");

class ArticleService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }

  async getByTitle(title) {
    try {
      let res = await this.model.find({
        title: { $regex: title.toLowerCase(), $options: "i" },
      });
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      let res = await this.model.find({ _id: id });
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }

  async getByAuthor(user) {
    try {
      let res = await this.model
        .find({ createdBy: user })
        .sort({ createdAt: -1 });
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      let res = await this.model
        .find()
        .sort({ createdAt: -1 })
        .skip(0)
        .populate({
          path: "createdBy",
          select: "name avatar _id",
        });
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      let res = await this.model.findByIdAndDelete(id);
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }

  async insert(article) {
    try {
      let res = await this.model.create(article);
      return new HttpResponse(res);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ArticleService };
