const router = require("express").Router();
const {
  createFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ
} = require("../../controllers/admin/faq.controller");

const isAuth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/admin.middleware");

router.use(isAuth, isAdmin);

router.get("/", getFAQs);
router.post("/", createFAQ);
router.put("/:id", updateFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;
