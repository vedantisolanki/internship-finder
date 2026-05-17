const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const requiredSkills = [
  "javascript",
  "react",
  "node",
  "mongodb",
  "express",
  "java",
  "python",
  "sql",
  "html",
  "css",
  "git",
];

const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Resume file is required",
    });
  }

  const filePath = req.file.path;

  let extractedText = "";

  // PDF Parsing
  if (req.file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    extractedText = pdfData.text;
  }

  // DOCX Parsing
  else if (
    req.file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    extractedText = result.value;
  }

  extractedText = extractedText.toLowerCase();

  // Detect skills
  const foundSkills = [];

  requiredSkills.forEach((skill) => {
    if (extractedText.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  // Missing skills
  const missingSkills = requiredSkills.filter(
    (skill) => !foundSkills.includes(skill)
  );

  // ATS Score Logic
  let atsScore = Math.round(
    (foundSkills.length / requiredSkills.length) * 100
  );

  // Suggestions
  const suggestions = [];

  if (atsScore < 50) {
    suggestions.push("Add more technical skills.");
  }

  if (!extractedText.includes("project")) {
    suggestions.push("Add project section.");
  }

  if (!extractedText.includes("experience")) {
    suggestions.push("Add experience section.");
  }

  if (!extractedText.includes("education")) {
    suggestions.push("Add education section.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        atsScore,
        foundSkills,
        missingSkills,
        suggestions,
      },
      "Resume analyzed successfully"
    )
  );
});

module.exports = {
  analyzeResume,
};