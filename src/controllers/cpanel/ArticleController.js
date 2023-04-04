const { Controller } = require("../../../system/controllers/Controller");
const { ArticleService } = require("../../services/ArticleService");
const { Article } = require("../../models/Article");
const autoBind = require("auto-bind");
const MediaController = require("./MediaController");
const articleService = new ArticleService(new Article().getInstance());
const config = require("../../../config/config").getConfig();

class ArticleController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  async addArticleScreen(req, res, next) {
    try {
      res.render("add-article");
    } catch (error) {
      next(error);
    }
  }

  async getByAuthor(req, res, next) {
    try {
      const { _id } = req.user;
      const response = await this.service.getByAuthor(_id);
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getByTitle(req, res, next) {
    try {
      const { title } = req.query;
      const response = await this.service.getByTitle(title);
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      return res.render("detail-article", { article: response.data[0] });
    } catch (e) {
      console.log("error", e);
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await this.service.getAll();
      res.render("index", { list: response.data });
    } catch (e) {
      next(e);
    }
  }

  async insert(req, res, next) {
    try {
      const response = await MediaController.insert(req, res, next);
      const image = response.data.path;
      const { title, content } = req.body;
      const { _id } = req.user;

      const result = await this.service.insert({
        title,
        content,
        image,
        createdAt: new Date(),
        createdBy: _id,
      });

      if (result.statusCode === 200) {
        return res.redirect("/cpanel/articles");
      } else {
        return res.redirect("add-article");
      }
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let { body, file } = req;
      if (file) {
        const response = await MediaController.insert(req, res, next);
        const img = response.data.path;
        body = { ...body, image: img };
      }
      const response = await this.service.update(id, body);
      console.log(">>>>", response);
      if (response.statusCode === 200) {
        return res.redirect("/cpanel/articles/");
      }
      return res.redirect(`/cpanel/articles/${id}`);
    } catch (e) {
      console.log(">>>>Errr", e);
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController(articleService);
