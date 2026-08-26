import { escapeHtml } from "./utils.mjs";

const renderList = (items) =>
  items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");

const renderLinks = (links) =>
  links
    .map(
      (link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(
        link.label
      )}</a>`
    )
    .join("<span>•</span>");

const renderJob = (job) => `
  <article class="job">
    <div class="job-header">
      <h3><span class="company">${escapeHtml(job.company)}</span> - ${escapeHtml(job.title)}</h3>
      <p>${escapeHtml(job.location)} | ${escapeHtml(job.period)}</p>
    </div>
    <ul>
      ${renderList(job.highlights)}
    </ul>
  </article>
`;

const renderEducation = (education) =>
  education
    .map(
      (item) => `
    <article class="education-item">
      <h3>${escapeHtml(item.degree)}</h3>
      <p>${escapeHtml(item.institution)} | ${escapeHtml(item.period || "")}</p>
      ${item.details ? `<p class="muted">${escapeHtml(item.details)}</p>` : ""}
    </article>
  `
    )
    .join("\n");

const renderSkills = (skills) =>
  Object.entries(skills)
    .map(
      ([group, items]) => `
      <div class="skill-group">
        <h4>${escapeHtml(group)}</h4>
        <p>${escapeHtml(items.join(" • "))}</p>
      </div>
    `
    )
    .join("\n");

const renderSpokenLanguages = (languages = []) =>
  languages.map((language) => `<li>${escapeHtml(language)}</li>`).join("\n");

export const buildResumeHtml = (resume) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(resume.name)} - Resume</title>
    <style>
      @page {
        size: A4;
        margin: 10mm;
      }

      :root {
        --ink: #111827;
        --muted: #374151;
        --accent: #0f172a;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 12px;
        line-height: 1.3;
      }

      main {
        display: block;
      }

      header {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .header {
        border-bottom: 1px solid #d1d5db;
        padding-bottom: 6px;
        margin-bottom: 8px;
      }

      .name {
        font-size: 22.9px;
        line-height: 1.1;
        margin: 0;
        font-weight: 700;
      }

      .headline {
        margin: 3px 0 0;
        color: var(--accent);
        font-weight: 600;
        font-size: 11.6px;
      }

      .contact {
        margin-top: 4px;
        color: var(--muted);
        display: flex;
        flex-wrap: wrap;
        gap: 3px 10px;
      }

      h2 {
        margin: 0 0 3px;
        font-size: 10.8px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--accent);
        border-bottom: 1px solid #d1d5db;
        padding-bottom: 2px;
      }

      section {
        margin-bottom: 7px;
      }

      .summary p {
        margin: 3px 0 0;
      }

      .summary {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .experience {
        break-inside: auto;
        page-break-inside: auto;
      }

      .job {
        margin-top: 9px;
        break-inside: avoid-page;
        page-break-inside: avoid;
      }

      .job:first-of-type {
        margin-top: 0;
      }

      .job-header h3 {
        margin: 0;
        font-size: 11.75px;
      }

      .job-header h3 .company {
        color: var(--accent);
        font-weight: 600;
      }

      .job-header p {
        margin: 2px 0 0;
        color: var(--muted);
      }

      ul {
        margin: 3.5px 0 0 16px;
        padding: 0;
      }

      li {
        margin: 1.2px 0;
      }

      .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 14px;
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .spoken-languages {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .spoken-languages ul {
        margin-top: 4px;
      }

      .education-item + .education-item {
        margin-top: 5px;
      }

      .education-item h3,
      .education-item p {
        margin: 0;
      }

      .education-item .muted {
        margin-top: 2px;
        color: var(--muted);
      }

      .skill-group + .skill-group {
        margin-top: 4px;
      }

      .skill-group h4 {
        margin: 0;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .skill-group p {
        margin: 2px 0 0;
      }

      .links {
        display: flex;
        flex-wrap: wrap;
        gap: 3px 10px;
        margin-top: 4px;
      }

      .links a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 600;
      }

      .links span {
        color: var(--muted);
      }

      .experience-title {
        margin-bottom: 4px;
      }
    </style>
  </head>
  <body>
    <main>
      <header class="header">
        <h1 class="name">${escapeHtml(resume.name)}</h1>
        <p class="headline">${escapeHtml(resume.headline)}</p>
        <div class="contact">
          <span>${escapeHtml(resume.location)}</span>
          <span>${escapeHtml(resume.contacts.email)}</span>
          <span>${escapeHtml(resume.contacts.phone)}</span>
        </div>
      </header>

      <section class="summary">
        <h2>Professional Summary</h2>
        <p>${escapeHtml(resume.summary)}</p>
      </section>

      <section class="experience">
        <h2 class="experience-title">Work Experience</h2>
        ${resume.workExperience.map(renderJob).join("\n")}
      </section>

      <div class="two-column">
        <section>
          <h2>Education</h2>
          ${renderEducation(resume.education)}
        </section>

        <section>
          <h2>Skills</h2>
          ${renderSkills(resume.skills)}
        </section>
      </div>

      <section class="spoken-languages">
        <h2>Languages</h2>
        <ul>
          ${renderSpokenLanguages(resume.spokenLanguages)}
        </ul>
      </section>

      <section>
        <h2>Links</h2>
        <div class="links">
          ${renderLinks(resume.links)}
        </div>
      </section>
    </main>
  </body>
</html>`;
};
