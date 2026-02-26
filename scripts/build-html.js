const fs = require("fs/promises");
const path = require("path");
const { minify } = require("html-minifier-terser");

const sourcePath = path.join(__dirname, "..", "src", "index.html");
const outputPath = path.join(__dirname, "..", "dist", "index.html");

async function buildHtml() {
    const sourceHtml = await fs.readFile(sourcePath, "utf8");

    const minifiedHtml = await minify(sourceHtml, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true
    });

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, minifiedHtml);
}

buildHtml().catch((error) => {
    console.error(error);
    process.exit(1);
});
