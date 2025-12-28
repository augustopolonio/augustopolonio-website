/**
 * Calculate years of experience from a starting year to current year
 * @param startYear - The year when experience started
 * @returns Number of years of experience
 */
export function calculateYearsOfExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

// Professional development started in 2012 (13+ years as of 2025)
export const WEB_MOBILE_START_YEAR = 2012;

// Game development journey started in 2015
export const GAME_DEV_START_YEAR = 2015;

/**
 * Get web and mobile development years of experience
 */
export function getWebMobileYears(): number {
  return calculateYearsOfExperience(WEB_MOBILE_START_YEAR);
}

/**
 * Get game development years of experience
 */
export function getGameDevYears(): number {
  return calculateYearsOfExperience(GAME_DEV_START_YEAR);
}
