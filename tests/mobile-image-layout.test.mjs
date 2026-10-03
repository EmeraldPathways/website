import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import postcss from "postcss";

const stylesheet = postcss.parse(
  await readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
);

function declarations(selector, breakpoint = "(max-width: 932px)") {
  let result;

  stylesheet.walkAtRules("media", (media) => {
    if (media.params !== breakpoint) return;
    media.walkRules((rule) => {
      if (!rule.selectors?.includes(selector)) return;
      result = Object.fromEntries(
        rule.nodes
          .filter((node) => node.type === "decl")
          .map((node) => [node.prop, node.value]),
      );
    });
  });

  return result ?? {};
}

function contrastAgainstWhite(color) {
  const channels = color.match(/[a-f\d]{2}/gi).map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  return 1.05 / (luminance + 0.05);
}

test("mobile project copy fits within its one-column card", () => {
  const projectCopy = declarations(".project-copy");
  const projectImage = declarations(".portfolio-row > img");

  assert.equal(projectCopy.width, "auto");
  assert.equal(projectCopy["min-width"], "0");
  assert.equal(projectCopy.margin, "0 5%");
  assert.equal(projectImage["aspect-ratio"], "auto");
  assert.equal(projectImage["object-fit"], "contain");
  assert.equal(projectImage.height, "auto");
});

test("mobile video previews use aligned, uncropped cards", () => {
  assert.equal(declarations(".video-previews-wide").display, "none");

  const previewGrid = declarations(".video-preview-grid");
  assert.equal(previewGrid.display, "grid");
  assert.equal(previewGrid["grid-template-columns"], "repeat(2, minmax(0, 1fr))");

  const previewFrame = declarations(".video-preview-frame");
  assert.equal(previewFrame["aspect-ratio"], "1 / 1");

  const previewImage = declarations(".video-preview-frame img");
  assert.equal(previewImage["object-fit"], "contain");
});

test("mobile logo gallery aligns a complete logo and wordmark", () => {
  assert.equal(
    declarations(".social-page .gallery-section .social-logo-grid img.media-pair-wide").display,
    "none",
  );

  const logoGrid = declarations(".social-page .social-logo-grid");
  assert.equal(logoGrid["grid-template-columns"], "repeat(2, minmax(0, 1fr))");

  const logoCard = declarations(".social-page .social-logo-grid .media-pair-mobile");
  assert.equal(logoCard.display, "grid");
  assert.equal(logoCard["aspect-ratio"], "1 / 1");

  const wordmark = declarations(".social-page .social-logo-grid .logo-wordmark");
  assert.equal(wordmark["text-align"], "center");
  assert.ok(contrastAgainstWhite(wordmark.color) >= 4.5, "wordmark should meet AA text contrast on white");
});

test("mobile SEO gallery fits the complete lower composite", () => {
  const composite = declarations(".seo-page .seo-gallery .seo-pair .seo-lower-wide");
  assert.equal(composite.display, "block");
  assert.equal(composite.width, "100%");
  assert.equal(composite.height, "auto");

  assert.equal(declarations(".seo-page .seo-lower-mobile").display, "none");
});
