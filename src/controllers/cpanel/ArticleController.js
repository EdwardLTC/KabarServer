const { Controller } = require("../../../system/controllers/Controller");
const { ArticleService } = require("../../services/ArticleService");
const { Article } = require("../../models/Article");
const autoBind = require("auto-bind");
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
      return res.render("detail-article", { article: response.data });
    } catch (e) {
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
      let { body, file } = req;
      if (file) {
        file = `http://${config.IPCONFIGHOME}:${config.PORT}/images/${file.filename}`;
        body = { ...body, image: file };
      }
      const { title, content, image } = body;
      const result = await this.service.insert({ title, content, image });
      if (result) {
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
        file = `http://${config.IPCONFIGHOME}:${config.PORT}/images/${file.filename}`;
        body = { ...body, image: file };
      }
      const response = await this.service.update(id, body);
      if (response.data.updated) {
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
      const response = await await this.service.delete(id);
      return res.json({ response });
    } catch (error) {
      return res.json({ response: false });
    }
  }
}

module.exports = new ArticleController(articleService);