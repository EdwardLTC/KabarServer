"use strict";
const { Service } = require("../../system/services/Service");
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const autoBind = require("auto-bind");

var ListArticle = [
  {
    _id: 1,
    title: "Article 1",
    content: "Content 1",
    image: "https://picsum.photos/200/300",
    createdAt: "2021-05-01T00:00:00.000Z",
    createdBy: 1,
  },
  {
    _id: 2,
    title: "Article 2",
    content: "Content 2",
    image: "https://picsum.photos/200/300",
    createdAt: "2021-05-01T00:00:00.000Z",
    createdBy: 2,
  },
  {
    _id: 3,
    title: "Article 3",
    content: "Content 3",
    image: "https://picsum.photos/200/300",
    createdAt: "2021-05-01T00:00:00.000Z",
    createdBy: 3,
  },
  {
    _id: 4,
    title: "Article 4",
    content: "Content 4",
    image: "https://picsum.photos/200/300",
    createdAt: "2021-05-01T00:00:00.000Z",
    createdBy: 4,
  },
  {
    _id: 5,
    title: "Article 5",
    content: "Content 5",
    image: "https://picsum.photos/200/300",
    createdAt: "2021-05-01T00:00:00.000Z",
    createdBy: 5,
  },
];

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
    // try {
    //   let res = await this.model.find({ _id: id });
    //   return new HttpResponse(res);
    // } catch (error) {
    //   throw error;
    // }
    try {
      let res = ListArticle.filter((item) => item._id == id);
      return new HttpResponse(res[0]);
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
    // try {
    //   let res = await this.model
    //     .find()
    //     .sort({ createdAt: -1 })
    //     .skip(0)
    //     .limit(30)
    //     .populate({
    //       path: "createdBy",
    //       select: "name avatar _id",
    //     });
    //   return new HttpResponse(res);
    // } catch (error) {
    //   throw error;
    // }

    try {
      return new HttpResponse(ListArticle);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    // try {
    //   let res = await this.model.findByIdAndDelete(id);
    //   return new HttpResponse(res);
    // } catch (error) {
    //   throw error;
    // }
    try {
      const tmp = ListArticle.filter(
        (item) => item._id.toString() != id.toString()
      );

      if (tmp.length !== ListArticle.length) {
        ListArticle = tmp;
        return true;
      } else {
        // The item was not found in the array, so return false
        return false;
      }
    } catch (error) {
      console.log(">>>>> error", error);
      throw error;
    }
  }

  async insert(article) {
    // try {
    //   let res = await this.model.create(article);
    //   return new HttpResponse(res);
    // } catch (error) {
    //   throw error;
    // }

    try {
      const tmp = {
        _id: ListArticle.length + 1,
        title: article.title,
        content: article.content,
        image: article.image,
        createdAt: new Date(),
        createdBy: 1, //article.createdBy
      };
      ListArticle.push(tmp);
      return true;
    } catch (error) {
      console.log(">>>>> error", error);
      throw error;
    }
  }

  async update(id, article) {
    try {
      let index = ListArticle.findIndex(
        (item) => item._id.toString() == id.toString()
      );
      if (index >= 0) {
        ListArticle[index].title = article.title;
        ListArticle[index].content = article.content;
        if (article.image) {
          ListArticle[index].image = article.image;
        }
        return new HttpResponse({ updated: true, article: ListArticle[index] });
      } else {
        return new HttpResponse({ updated: false, article: {} });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ArticleService };
