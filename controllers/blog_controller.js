const db = require("../models");

exports.getBlogs = (req, res) => {
  try {
    db.Blog.find().exec((err, result) => {
      if (result) {
        res.status(200).json({ result: result });
      } else if (err) {
        res.status(400).json({ error: err });
      } else res.status(400).json({ error: err });
    });
  } catch (e) {
    res.send(e);
    console.log("error in catch-block @getBlogs:->", e);
  }
};
exports.getBlogByOrg_id = (req, res) => {
  try {
    db.Blog.find({ organizer_id: req.params.org_id }).exec((err, result) => {
      if (result) {
        res.status(200).json({ result: result });
      } else if (err) {
        res.status(400).json({ error: `error getting blogs: ${err}` });
      } else
        res.status(400).json({ error: `error getting blogs @else: ${err}` });
    });
  } catch (e) {
    res.send(e);
    console.log("error in catch-block @getBlogByOrg_id:->", e);
  }
};
exports.deleteBlogByID = (req, res) => {
  try {
    db.Blog.deleteOne({ _id: req.params.id }).exec((err, result) => {
      if (result) {
        res.status(200).json({ result: 'Blog post deleted!' });
      } else if (err) {
        res.status(400).json({ error: `error getting blogs: ${err}` });
      } else
        res.status(400).json({ error: `error getting blogs @else: ${err}` });
    });
  } catch (e) {
    res.send(e);
    console.log("error in catch-block @getBlogByOrg_id:->", e);
  }
};
