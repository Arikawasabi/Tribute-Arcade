const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = path.resolve(__dirname, "..");
const outputsDir = path.join(root, "outputs");
const srcDir = path.join(root, "src");
const srcScriptsDir = path.join(srcDir, "scripts");
const cloudflareDir = path.join(outputsDir, "cloudflare", "public");
const renderDir = path.join(outputsDir, "render_upload");
const templatePath = path.join(srcDir, "tribute_four.template.html");
const stylesPath = path.join(srcDir, "styles.css");
const bootScriptPath = path.join(srcScriptsDir, "online-runtime.js");
const appScriptPath = path.join(srcScriptsDir, "app.js");
const outputHtmlPath = path.join(outputsDir, "tribute_four.html");

const cssToken = "/* {{TRIBUTE_ARCADE_CSS}} */";
const bootToken = "/* {{TRIBUTE_ARCADE_BOOT_JS}} */";
const appToken = "/* {{TRIBUTE_ARCADE_APP_JS}} */";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, contents) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function extractSources() {
  const html = read(outputHtmlPath);
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  if (!styleMatch) throw new Error("Could not find the inline <style> block.");
  if (scriptMatches.length !== 2) {
    throw new Error(`Expected 2 inline scripts, found ${scriptMatches.length}.`);
  }

  let template = html.replace(styleMatch[1], `\n${cssToken}\n`);
  template = template.replace(scriptMatches[0][1], `\n${bootToken}\n`);
  template = template.replace(scriptMatches[1][1], `\n${appToken}\n`);

  write(stylesPath, styleMatch[1].replace(/^\n|\n$/g, "") + "\n");
  write(bootScriptPath, scriptMatches[0][1].replace(/^\n|\n$/g, "") + "\n");
  write(appScriptPath, scriptMatches[1][1].replace(/^\n|\n$/g, "") + "\n");
  write(templatePath, template);
  console.log("Extracted split sources into src/.");
}

function buildHtml() {
  let html = read(templatePath);
  html = html.replace(cssToken, read(stylesPath).replace(/\s*$/, ""));
  html = html.replace(bootToken, read(bootScriptPath).replace(/\s*$/, ""));
  html = html.replace(appToken, read(appScriptPath).replace(/\s*$/, ""));
  write(outputHtmlPath, html);
  write(path.join(cloudflareDir, "tribute_four.html"), html);
  write(path.join(renderDir, "tribute_four.html"), html);

  const serverSource = path.join(outputsDir, "multiplayer_server.js");
  const serverTarget = path.join(renderDir, "multiplayer_server.js");
  if (fs.existsSync(serverSource)) {
    ensureDir(renderDir);
    fs.copyFileSync(serverSource, serverTarget);
  }
  console.log("Built deploy HTML copies.");
}

function parseReferencedAssetNames() {
  const files = [
    outputHtmlPath,
    path.join(outputsDir, "multiplayer_server.js"),
    templatePath,
    stylesPath,
    bootScriptPath,
    appScriptPath
  ].filter((file) => fs.existsSync(file));
  const text = files.map(read).join("\n");
  const refs = new Set();
  for (const match of text.matchAll(/[A-Za-z0-9_ ()-]+\.(?:png|webp|jpg|jpeg|gif|svg)/gi)) {
    refs.add(match[0]);
  }
  return refs;
}

function pruneUnusedDeployAssets() {
  const refs = parseReferencedAssetNames();
  const candidates = [
    path.join(cloudflareDir, "custom_playing_card_deck_sheet.png"),
    path.join(cloudflareDir, "jack_of_spades_rebuilt.png"),
    path.join(renderDir, "custom_playing_card_deck_sheet.png"),
    path.join(renderDir, "jack_of_spades_rebuilt.png")
  ];
  let removed = 0;
  for (const file of candidates) {
    if (fs.existsSync(file) && !refs.has(path.basename(file))) {
      fs.rmSync(file);
      removed += 1;
      console.log(`Removed unused asset: ${path.relative(root, file)}`);
    }
  }
  if (!removed) console.log("No unused deploy leftovers needed pruning.");
}

function rebuildZip() {
  ensureDir(renderDir);
  const zipPath = path.join(outputsDir, "tribute_arcade_render_upload.zip");
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
  const command = [
    "Compress-Archive",
    "-Path",
    quotePowerShell(path.join(renderDir, "*")),
    "-DestinationPath",
    quotePowerShell(zipPath),
    "-Force"
  ].join(" ");
  childProcess.execFileSync("powershell.exe", ["-NoProfile", "-Command", command], {
    cwd: root,
    stdio: "inherit"
  });
  console.log(`Rebuilt ${path.relative(root, zipPath)}.`);
}

function quotePowerShell(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

function printHelp() {
  console.log(`Usage:
  node scripts/build_public.js --extract   Split outputs/tribute_four.html into src files
  node scripts/build_public.js --build     Build deploy HTML and zip from src files
  node scripts/build_public.js --prune     Remove known unused deploy image leftovers
  node scripts/build_public.js             Build deploy HTML and zip from src files`);
}

const args = new Set(process.argv.slice(2));
if (args.has("--help") || args.has("-h")) {
  printHelp();
  process.exit(0);
}
if (args.has("--extract")) extractSources();
if (args.has("--prune")) pruneUnusedDeployAssets();
if (!args.has("--extract") || args.has("--build")) {
  buildHtml();
  rebuildZip();
}
