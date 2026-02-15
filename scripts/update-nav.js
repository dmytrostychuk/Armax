const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HTML_ROOT = path.join(ROOT, "src", "html");
const INDEX_HTML = path.join(HTML_ROOT, "index.html");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
      out.push(p);
  }
  return out;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getIndexNavUlBlock(indexHtml) {
  const re =
    /(<ul\s+class="nav__list">\s*)([\s\S]*?)(\s*<\/ul>)/m;
  const m = indexHtml.match(re);
  if (!m) throw new Error('Could not find <ul class="nav__list"> in index.html');
  return { open: '<ul class="nav__list">', inner: m[2], full: m[0] };
}

function isNestedHtml(filePath) {
  const rel = path.relative(HTML_ROOT, filePath);
  return rel.includes(path.sep);
}

function normalizeHrefsToContext(ulFull, nested) {
  // Prefix all local hrefs with ../ for nested pages (except ones already ../, #, http(s), mailto, tel).
  if (!nested) return ulFull;

  return ulFull.replace(/href="([^"]+)"/g, (m, href) => {
    if (
      href.startsWith("../") ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return m;
    }
    return `href="../${href}"`;
  });
}

function stripActiveClasses(ulFull) {
  // Remove any existing link--active occurrences to make this idempotent.
  return ulFull.replace(/\s+link--active\b/g, "");
}

function addActiveClassForHref(ulFull, activeHref) {
  if (!activeHref) return ulFull;

  // Add link--active to the same <a ...> tag that has the matching href.
  // We only touch anchors that already have class="...".
  const hrefNeedle = `href="${activeHref}"`;
  return ulFull.replace(
    new RegExp(
      `(<a\\s+[^>]*${escapeRegExp(hrefNeedle)}[^>]*\\sclass=")([^"]*)(")`,
      "g"
    ),
    (m, pre, cls, post) => {
      if (/\blink--active\b/.test(cls)) return m;
      return `${pre}${cls} link--active${post}`;
    }
  );
}

function getActiveHrefForFile(filePath) {
  const rel = path.relative(HTML_ROOT, filePath).replace(/\\/g, "/");

  // Root-level pages
  if (!rel.includes("/")) {
    // Main top-level links present in the nav list
    const topLevel = new Set([
      "about-us.html",
      "contacts.html",
      "product.html",
      "services.html",
      "news.html",
    ]);
    const productDropdown = new Set([
      "furniture-elements.html",
      "chair-frames.html",
      "furniture-fittings.html",
      "outdoor-furniture.html",
      "ag-equipment.html",
      "сustom-orders.html",
    ]);
    if (topLevel.has(rel)) return rel;
    if (productDropdown.has(rel)) return rel;
    // index.html has no corresponding link in the list
    return null;
  }

  // Nested detail pages: highlight the section/category page in dropdown
  if (rel.startsWith("ag-equipment/")) return "../ag-equipment.html";
  if (rel.startsWith("furniture-elements/")) return "../furniture-elements.html";

  return null;
}

function replaceNavUlInFile(html, newUlFull) {
  // Replace ONLY the first nav__list UL (the menu), not the social list.
  const re = /(^[ \t]*)<ul\s+class="nav__list">[\s\S]*?<\/ul>/m;
  const m = html.match(re);
  if (!m) return { changed: false, html };

  const indent = m[1] ?? "";
  const indentedUl = newUlFull
    .split("\n")
    .map((line, idx) => (idx === 0 ? indent + line : indent + line))
    .join("\n");

  const out = html.replace(re, indentedUl);
  return { changed: out !== html, html: out };
}

function main() {
  const indexHtml = fs.readFileSync(INDEX_HTML, "utf8");
  const { full: indexUlFull } = getIndexNavUlBlock(indexHtml);

  const files = walk(HTML_ROOT);
  let changedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");

    const nested = isNestedHtml(file);
    const activeHref = getActiveHrefForFile(file);

    let ul = indexUlFull;
    ul = normalizeHrefsToContext(ul, nested);
    ul = stripActiveClasses(ul);
    ul = addActiveClassForHref(ul, activeHref);

    const { changed, html: next } = replaceNavUlInFile(html, ul);
    if (!changed) {
      skippedCount++;
      continue;
    }
    fs.writeFileSync(file, next, "utf8");
    changedCount++;
  }

  console.log(
    `Done. Updated nav menu in ${changedCount} file(s). Skipped ${skippedCount} file(s) (no matching <ul class="nav__list"> found).`
  );
}

main();

