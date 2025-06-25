const isCoverage = process.env.INSTRUMENT === "true";

module.exports = {
  experimental: {
    ...(!isCoverage && {
        forceSwcTransforms: true
    }),
  }
};