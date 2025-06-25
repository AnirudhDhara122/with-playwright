const plugins = [];

// Instrument for code coverage in development mode
if (process.env.INSTRUMENT === "true") {
  console.log(
    "Detected development environment. Instrumenting code for coverage."
  );
  plugins.push("istanbul")
}

module.exports = {
  presets: ["next/babel"],
  plugins,
};