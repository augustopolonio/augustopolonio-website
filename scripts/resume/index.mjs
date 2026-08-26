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

const parseArgs = () => {
  const args = process.argv.slice(2);
  let lang = "en";
  let inputArg = null;
  let outputArg = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--lang") {
      lang = args[i + 1] || "en";
      i++;
    } else if (!inputArg) {
      inputArg = args[i];
    } else if (!outputArg) {
      outputArg = args[i];
    }
  }

  return { lang, inputArg, outputArg };
};

const { lang, inputArg: inputArgPassed, outputArgPassed } = parseArgs();

const getDataPaths = (language) => {
  if (language === "pt-br") {
    return {
      experiencesFile: "public/data/experiences-pt-br.json",
      profileModule: () => import("./profile-pt-br.mjs"),
      stringsModule: () => import("./strings-pt-br.mjs")
    };
  }
  return {
    experiencesFile: "public/data/experiences.json",
    profileModule: () => import("./profile.mjs"),
    stringsModule: () => import("./strings-en.mjs")
  };
};

const paths = getDataPaths(lang);
const inputArg = inputArgPassed || paths.experiencesFile;
const outputArg = outputArgPassed || DEFAULT_OUTPUT_FILE[lang];
const outputPath = path.resolve(projectRoot, outputArg);

const run = async () => {
  const { experiences, inputPath } = loadExperienceData(projectRoot, inputArg);
  const experienceYears = getExperienceYears(projectRoot);
  const profileMod = await paths.profileModule();
  const stringsMod = await paths.stringsModule();

  const normalized = buildNormalizedResume({
    ...profileMod.profile,
    summary: profileMod.buildProfileSummary(experienceYears),
    workExperience: experiences
  });
  const html = buildResumeHtml(normalized, stringsMod.strings);

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
