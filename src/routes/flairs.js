const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

router.get("/flairs", flairController.index);

router.get("/flairs/new", flairController.new);

router.get("/flairs/:id", flairController.show);

router.get("/flairs/:id/edit", flairController.edit);

router.post("/flairs/create", flairController.create);

router.post("/flairs/:id/destroy", flairController.destroy);

router.post("/flairs/:id/update", flairController.update);

module.exports = router;