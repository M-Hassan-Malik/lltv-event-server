const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/all/getBlogs`, Controller.Blog.getBlogs);

router.get(`/getBlogByOrg_id/:org_id`, Controller.Blog.getBlogByOrg_id);

router.delete(`/deleteBlogByID/:id`, Controller.Blog.deleteBlogByID);

module.exports = router;
 