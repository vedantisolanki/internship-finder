const multer = require("multer");
const path = require("path");

// ✅ correct folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/resumes"));
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName); // ✅ keeps .docx or .pdf properly
  }
});

const upload = multer({ storage });

module.exports = upload;