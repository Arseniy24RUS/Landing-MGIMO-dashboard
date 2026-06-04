const { defineConfig } = require("@playwright/test");

const port = process.env.PORT || 4184;
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 45 * 1000,
  expect: {
    timeout: 7 * 1000
  },
  webServer: {
    command: `npx http-server . -a 127.0.0.1 -p ${port} -c-1`,
    url: `${baseURL}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  use: {
    baseURL
  }
});
