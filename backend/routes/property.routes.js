const express = require("express");
const router = express.Router();
const controller = require("../controllers/property.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");

// Create draft
router.post("/", auth, controller.createDraft);

// Update any step
router.put("/:id", auth, controller.updateProperty);

// Submit final
router.post("/:id/submit", auth, controller.submitProperty);

// Upload photos
router.post(
  "/:id/photos",
  auth,
  upload.array("photos", 10),
  controller.uploadPhotos
);

// Delete photo
router.delete(
  "/:id/photos/:publicId",
  auth,
  controller.deletePhoto
);

module.exports = router;
