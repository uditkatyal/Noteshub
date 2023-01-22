const Note = require("../models/noteModel");

exports.allNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({
      status: "success",
      notes,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      res.status(400).json({
        status: "fail",
        message: "title or content or category is required",
      });
    }
    const note = await Note.create({
      title,
      content,
      category,
      user: req.user,
    });
    res.status(201).json({
      status: "success",
      note,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.noteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      res.status(200).json({
        status: "success",
        note,
      });
    } else {
      throw new Error("Note does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    if (req.user.id.toString() !== note.user.toString()) {
      res.status(401);
      throw new Error("you cannot perform this action");
    }
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;

      const updatedNote = await note.save();
      //   res.status(204).json({
      //     status: "success",
      //     updatedNote,
      //   });
      res.json(updatedNote);
    } else {
      throw new Error("Note update failed");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (req.user.id.toString() !== note.user.toString()) {
      res.status(401);
      throw new Error("Not Authorized to perform this action");
    }
    if (note) {
      await note.remove();
      res.json({
        status: "success",
        message: "Note Deleted Successfully",
      });
    } else {
      res.status(404);
      throw new Error("Note Not Found");
    }
  } catch (err) {
    console.log(err);
  }
};
