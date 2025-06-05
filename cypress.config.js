const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://homologacaoesp.interplayers.com.br",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      on("task", {
        logErrosJS(report) {
          const logsDir = path.join(__dirname, "logs");
          if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
          }

          const filePath = path.join(logsDir, `errosJS-${Date.now()}.txt`);
          fs.writeFileSync(filePath, report, "utf8");

          console.log(" Log de erros JS salvo em:", filePath);
          return null;
        },
      });

      return config;
    },
  },

  video: true,
  videoUploadOnPasses: false,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: true,
    html: true,
    json: true,
    reportTitle: "Relatório de Testes - Cypress",
    reportPageTitle: "Relatório Automatizado",
    charts: true,
    inlineAssets: true,
  },
});
