const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://homologacaoesp.interplayers.com.br",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {},
  },
  video: true, // Grava vídeo sempre
  videoUploadOnPasses: false, // Mantém vídeo mesmo quando passa
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: true,
    html: true,
    json: true,
  },
});
