import { rm } from "node:fs/promises";

export default function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  eleventyConfig.addLayoutAlias("default", "base.njk");
  eleventyConfig.addGlobalData("layout", "base.njk");

  eleventyConfig.on("eleventy.before", async ({ dir, runMode }) => {
    if (runMode === "build") await rm(dir.output, { recursive: true, force: true });
  });

  eleventyConfig.addPassthroughCopy({ "assets/css/site.css": "assets/css/site.css" });
  eleventyConfig.addPassthroughCopy({ "images/*.{png,ico,webmanifest}": "images" });
  eleventyConfig.addPassthroughCopy({ files: "files" });

  eleventyConfig.addCollection("redirects", (collectionApi) =>
    collectionApi.getAll().flatMap(({ data, url }) =>
      (data.redirect_from || []).map((from) => ({ from, to: url })),
    ),
  );

  return {
    dir: {
      input: "_pages",
      includes: "../_includes",
      data: "../_data",
      output: "dist",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
  };
}
