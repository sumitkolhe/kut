const express = require("express");
const router = express.Router();
const reducedController = require("../controllers/reducedController");
const limit = require("../middleware/rateLimiter");

router.get("/:alias", reducedController.reduced_redirect);
router.post("/api/shorten", limit, reducedController.reduced_shorten);
router.post("/api/check", limit, reducedController.reduced_check);

module.exports = router;
