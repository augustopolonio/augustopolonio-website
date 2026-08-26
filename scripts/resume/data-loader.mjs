import fs from "node:fs";
import path from "node:path";
import { REQUIRED_FIELDS } from "./types.mjs";

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const assertExperience = (item, index) => {
  const missing = REQUIRED_FIELDS.filter((key) => !(key in item));
  if (missing.length > 0) {
    throw new Error(
      `Experience at index ${index} is missing required fields: ${missing.join(", ")}`
    );
  }
};

export const loadExperienceData = (rootDir, inputRelativePath) => {
  const inputPath = path.resolve(rootDir, inputRelativePath);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Experience data file not found: ${inputPath}`);
  }

  const experiences = readJson(inputPath);

  if (!Array.isArray(experiences) || experiences.length === 0) {
    throw new Error("experiences.json must be a non-empty array");
  }

  experiences.forEach(assertExperience);

  return { experiences, inputPath };
};
