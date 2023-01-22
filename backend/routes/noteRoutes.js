const noteController = require("../controllers/noteControllers");
const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/").get(protect, noteController.allNotes);
router.route("/create").post(protect, noteController.createNote);
router
  .route("/:id")
  .get(noteController.noteById)
  .put(protect, noteController.updateNote)
  .delete(protect, noteController.deleteNote);
module.exports = router;
