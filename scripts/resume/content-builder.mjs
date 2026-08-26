import { ROLE_BULLET_LIMIT } from "./types.mjs";
import { clamp, dedupe, normalizeWhitespace } from "./utils.mjs";

const LEADERSHIP_PATTERN = /lead|mentor|manage|founded|drove|collaborat|guid(ed|ing)/i;
const IMPACT_PATTERN = /improv|optimiz|scale|modern|migrat|autom|perform|deliver|enhanc/i;
const AI_PATTERN = /\bai\b|copilot|kiro|ollama|lm studio|automation/i;

const buildTechnologyBullet = (job) => {
  const tech = Array.isArray(job.technologies) ? job.technologies : [];
  if (tech.length === 0) return null;
  return `Main tech: ${tech.join(", ")}.`;
};

const toActionBullet = (text) => {
  const trimmed = normalizeWhitespace(text);
  if (!trimmed) return null;
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

const buildFallbackBullets = (job) => {
  const bullets = [];

  bullets.push(
    `Owned delivery for ${job.title} initiatives, aligning architecture and product requirements.`
  );

  if (job.description) {
    bullets.push(toActionBullet(job.description));
  }

  const techBullet = buildTechnologyBullet(job);
  if (techBullet) bullets.push(techBullet);

  bullets.push(
    "Improved execution quality through code reviews, clear documentation, and iterative releases."
  );

  return bullets.filter(Boolean);
};

const prioritizeHighlights = (highlights) => {
  const leadership = [];
  const impact = [];
  const ai = [];
  const other = [];

  for (const item of highlights) {
    if (AI_PATTERN.test(item)) {
      ai.push(item);
    } else if (LEADERSHIP_PATTERN.test(item)) {
      leadership.push(item);
    } else if (IMPACT_PATTERN.test(item)) {
      impact.push(item);
    } else {
      other.push(item);
    }
  }

  return [...leadership, ...impact, ...ai, ...other];
};

export const buildNormalizedResume = (resumeData) => {
  const jobs = resumeData.workExperience.map((job) => {
    const sourceHighlights = Array.isArray(job.highlights)
      ? dedupe(job.highlights.map((h) => normalizeWhitespace(h)).filter(Boolean))
      : [];

    const prioritized = prioritizeHighlights(sourceHighlights)
      .map(toActionBullet)
      .filter(Boolean);

    const targetCount = clamp(prioritized.length || 4, ROLE_BULLET_LIMIT.min, ROLE_BULLET_LIMIT.max);

    let bullets = prioritized.slice(0, targetCount);

    if (!bullets.some((b) => AI_PATTERN.test(b))) {
      const aiSource = sourceHighlights.find((h) => AI_PATTERN.test(h));
      if (aiSource) {
        bullets = [toActionBullet(aiSource), ...bullets].filter(Boolean).slice(0, ROLE_BULLET_LIMIT.max);
      }
    }

    const techBullet = buildTechnologyBullet(job);

    if (bullets.length < ROLE_BULLET_LIMIT.min) {
      bullets = dedupe([...bullets, ...buildFallbackBullets(job)]).slice(0, ROLE_BULLET_LIMIT.min);
    }

    if (techBullet) {
      const nonTechBullets = bullets.filter((b) => !b.startsWith("Main tech:"));
      const trimmed = nonTechBullets.slice(0, ROLE_BULLET_LIMIT.max - 1);
      bullets = [...trimmed, techBullet];
    } else if (bullets.length > ROLE_BULLET_LIMIT.max) {
      bullets = bullets.slice(0, ROLE_BULLET_LIMIT.max);
    }

    return {
      ...job,
      highlights: bullets
    };
  });

  return {
    ...resumeData,
    workExperience: jobs
  };
};
