import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_OUTPUT_FILE } from "./types.mjs";
import { loadExperienceData } from "./data-loader.mjs";
import { buildNormalizedResume } from "./content-builder.mjs";
import { buildResumeHtml } from "./template-html.mjs";
import { ensureTwoPages, renderPdfFromHtml, writeHtmlPreview } from "./pdf-generator.mjs";
import { buildProfileSummary, profile } from "./profile.mjs";
import { getExperienceYears } from "./experience-years.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

const inputArg = process.argv[2] || "public/data/experiences.json";
const outputArg = process.argv[3] || DEFAULT_OUTPUT_FILE;
const outputPath = path.resolve(projectRoot, outputArg);

const run = async () => {
  const { experiences, inputPath } = loadExperienceData(projectRoot, inputArg);
  const experienceYears = getExperienceYears(projectRoot);

  const normalized = buildNormalizedResume({
    ...profile,
    summary: buildProfileSummary(experienceYears),
    workExperience: experiences
  });
  const html = buildResumeHtml(normalized);

  const htmlPath = writeHtmlPreview(projectRoot, html);
  await renderPdfFromHtml({ html, outputPath });
  await ensureTwoPages(outputPath);

  console.log(`Resume input: ${inputPath}`);
  console.log(`HTML preview: ${htmlPath}`);
  console.log(`PDF output: ${outputPath}`);
  console.log("Resume generated successfully (exactly 2 pages).");
};

run().catch((error) => {
  console.error("Resume generation failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
