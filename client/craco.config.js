module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/scss/_functions.scss";
        `,
      },
    },
  },
};
