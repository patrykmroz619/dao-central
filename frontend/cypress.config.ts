import { defineConfig } from "cypress";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import metamaskPlugin from "cypress-metamask-v2/cypress/plugins";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    downloadsFolder: "tests/cypress/downloads",
    fixturesFolder: "tests/cypress/fixtures",
    screenshotsFolder: "tests/cypress/screenshots",
    videosFolder: "tests/cypress/videos",
    supportFile: "tests/cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
      metamaskPlugin(on);
    },
  },
});
