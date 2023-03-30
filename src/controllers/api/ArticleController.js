const { Controller } = require("../../../system/controllers/Controller");
const { ArticleService } = require("../../services/ArticleService");
const { Article } = require("../../models/Article");
const autoBind = require("auto-bind");
const articleService = new ArticleService(new Article().getInstance());

class ArticleController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
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
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async insert(req, res, next) {
    try {
      const { _id } = req.user;
      const { title, content, image } = req.body;
      const response = await this.service.insert({
        title,
        content,
        image,
        createdAt: new Date(),
        createdBy: _id,
      });
      return await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, image } = req.body;
      const response = await this.service.update(id, { title, content, image });
      return await res.status(response.statusCode).json(response);
    } catch (e) {
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
