const fs = require("fs/promises");
const path = require("path");
const { minify } = require("html-minifier-terser");

const PLACEHOLDER = "__EMAILJS_PUBLIC_KEY__";
const DEFAULT_EMAILJS_PUBLIC_KEY = "wcy9XEYLqeMZK0Rlu";

const sourcePath = path.join(__dirname, "..", "src", "index.html");
const outputPath = path.join(__dirname, "..", "dist", "index.html");

async function buildHtml() {
    const sourceHtml = await fs.readFile(sourcePath, "utf8");
    const envPublicKey = (process.env.EMAILJS_PUBLIC_KEY || "").trim();
    const publicKey = envPublicKey || DEFAULT_EMAILJS_PUBLIC_KEY;

    const htmlWithPublicKey = sourceHtml.split(PLACEHOLDER).join(publicKey);

    const minifiedHtml = await minify(htmlWithPublicKey, {
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
