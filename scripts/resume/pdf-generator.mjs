import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

export const renderPdfFromHtml = async ({ html, outputPath }) => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true
    });
  } finally {
    await browser.close();
  }
};

export const countPdfPages = async (pdfPath) => {
  const bytes = fs.readFileSync(pdfPath);
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
};

export const ensureTwoPages = async (pdfPath) => {
  const pages = await countPdfPages(pdfPath);
  if (pages !== 2) {
    throw new Error(
      `Resume must be exactly 2 pages, but generated ${pages} page(s). Adjust content or template spacing.`
    );
  }
  return pages;
};

export const writeHtmlPreview = (projectRoot, html) => {
  const previewDir = path.join(projectRoot, "scripts", "resume", "output");
  fs.mkdirSync(previewDir, { recursive: true });

  const htmlPath = path.join(previewDir, "resume.preview.html");
  fs.writeFileSync(htmlPath, html, "utf8");

  return htmlPath;
};
