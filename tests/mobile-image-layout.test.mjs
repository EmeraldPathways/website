import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import postcss from "postcss";

const css = postcss.parse(await readFile(new URL("../app/globals.css", import.meta.url), "utf8"));
const social = await readFile(new URL("../app/social-media/page.tsx", import.meta.url), "utf8");
const seo = await readFile(new URL("../app/seo/page.tsx", import.meta.url), "utf8");

function declarations(selector, breakpoint) {
  let result = {};
  const visit = (rule) => {
    if (!rule.selectors?.includes(selector)) return;
    result = Object.fromEntries(rule.nodes.filter((node) => node.type === "decl").map((node) => [node.prop, node.value]));
  };
  if (breakpoint) css.walkAtRules("media", (media) => {
    if (media.params === breakpoint) media.walkRules(visit);
  });
  else css.nodes.filter((node) => node.type === "rule").forEach(visit);
  return result;
}

async function dimensions(name) {
  const bytes = await readFile(new URL(`../public/assets/${name}`, import.meta.url));
  if (bytes.toString("ascii", 1, 4) === "PNG") return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  for (let i = 2; i < bytes.length - 9;) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    const length = bytes.readUInt16BE(i + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) return [bytes.readUInt16BE(i + 7), bytes.readUInt16BE(i + 5)];
    i += 2 + length;
  }
  throw new Error(`Cannot read dimensions for ${name}`);
}

test("portfolio copy and images fit the mobile column", () => {
  const project = declarations(".project-copy", "(max-width: 932px)");
  const image = declarations(".portfolio-row > img", "(max-width: 932px)");
  assert.equal(project.width, "auto");
  assert.equal(project["min-width"], "0");
  assert.equal(image["object-fit"], "contain");
  assert.equal(image.height, "auto");
});

test("social galleries use original full artwork and no dead video players", async () => {
  for (const [file, minWidth, minHeight] of [
    ["social_whiskey_experts_full.png", 1080, 1080],
    ["social_whiskey_school_full.png", 1080, 1080],
    ["social_audit_map_full.jpg", 1200, 550],
    ["social_audit_chart_full.jpg", 1200, 550],
  ]) {
    assert.ok(social.includes(file), `${file} is used on the page`);
    const [width, height] = await dimensions(file);
    assert.ok(width >= minWidth && height >= minHeight, `${file} is a complete original`);
  }
  assert.doesNotMatch(social, /social_(logo|audit|video)_pair|www-ccv\.adobe\.io/);
  assert.equal(declarations(".social-audit-grid")["grid-template-columns"], "minmax(0, 1fr)");
  assert.equal(declarations(".social-page .social-logo-grid", "(max-width: 540px)")["grid-template-columns"], "minmax(0, 1fr)");
  assert.equal(declarations(".social-logo-grid img")["object-fit"], "contain");
});

test("SEO screenshots are complete and stack without cropping", async () => {
  for (const [file, minWidth, minHeight] of [
    ["seo_dashboard_full.jpg", 1255, 687],
    ["seo_score_full.jpg", 1547, 704],
    ["seo_keywords_full.jpg", 1564, 811],
  ]) {
    assert.ok(seo.includes(file), `${file} is used on the page`);
    const [width, height] = await dimensions(file);
    assert.ok(width >= minWidth && height >= minHeight, `${file} is a complete original`);
  }
  assert.equal(declarations(".seo-page .seo-dashboard")["object-fit"], "contain");
  assert.equal(declarations(".seo-page .seo-pair")["grid-template-columns"], "minmax(0, 1fr)");
  assert.equal(declarations(".seo-page .seo-pair img")["object-fit"], "contain");
});

test("small-screen controls and form fields remain usable", () => {
  assert.equal(declarations(".menu-button", "(max-width: 932px)").width, "44px");
  assert.equal(declarations(".menu-close").width, "44px");
  assert.equal(declarations(".hero p", "(max-width: 932px)")["line-height"], "1.4");
  assert.equal(declarations(".contact-form input", "(max-width: 540px)")["font-size"], "16px");
});
