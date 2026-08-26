import fs from "node:fs";
import path from "node:path";

const extractStartYear = (source, constantName) => {
  const regex = new RegExp(`export const ${constantName} = (\\d{4})`);
  const match = source.match(regex);

  if (!match) {
    throw new Error(
      `Could not find ${constantName} in app/utils/calculateExperience.ts`
    );
  }

  return Number(match[1]);
};

export const getExperienceYears = (projectRoot) => {
  const filePath = path.join(projectRoot, "app", "utils", "calculateExperience.ts");
  const source = fs.readFileSync(filePath, "utf8");

  const webMobileStartYear = extractStartYear(source, "WEB_MOBILE_START_YEAR");
  const gameDevStartYear = extractStartYear(source, "GAME_DEV_START_YEAR");

  const currentYear = new Date().getFullYear();

  return {
    webMobileYears: currentYear - webMobileStartYear,
    gameDevYears: currentYear - gameDevStartYear
  };
};
