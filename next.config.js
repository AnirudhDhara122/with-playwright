const isCoverage = process.env.NODE_ENV === "development";

module.exports = {
  experimental: {
    ...(!isCoverage && {
        forceSwcTransforms: true
    }),
  }
};