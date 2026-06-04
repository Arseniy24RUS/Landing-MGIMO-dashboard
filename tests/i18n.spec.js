const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("@playwright/test");

const screenshotDir = path.join(process.cwd(), "qa-screenshots", "Landing-MGIMO-dashboard");

function ensureScreenshotDir() {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function newLocalizedPage(browser, locale, viewport) {
  const context = await browser.newContext({ locale, viewport });
  await context.addInitScript(() => {
    window.localStorage.removeItem("lang");
  });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto("/index.html");
  await page.waitForFunction(() => Boolean(window.AppI18n));
  await page.evaluate(() => window.AppI18n.ready);

  return { context, page, consoleErrors };
}

async function expectSingleToggle(page, text) {
  const toggle = page.getByTestId("language-toggle");
  await expect(toggle).toHaveCount(1);
  await expect(toggle).toHaveText(text);
  return toggle;
}

async function expectEnglish(page) {
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Socioeconomic Data Dashboard for Russian Regions - MGIMO University");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /socioeconomic data dashboard for Russian regions/
  );
  await expect(page.getByRole("button", { name: "Home" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Key Features" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Educational and methodological complex" }).first()).toBeVisible();
}

async function expectRussian(page) {
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page).toHaveTitle("Дашборд социально-экономических данных субъектов РФ — МГИМО МИД России");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Проектный лендинг дашборда/
  );
  await expect(page.getByRole("button", { name: "Главная" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ключевые особенности" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Учебно-методический комплекс" }).first()).toBeVisible();
}

test.describe("EN/RU i18n", () => {
  test("defaults to English for en-US and toggles to Russian", async ({ browser }) => {
    ensureScreenshotDir();
    const { context, page, consoleErrors } = await newLocalizedPage(browser, "en-US", {
      width: 1440,
      height: 1000
    });

    await expectEnglish(page);
    let toggle = await expectSingleToggle(page, "RU");
    await page.screenshot({ path: path.join(screenshotDir, "desktop-en.png") });

    await toggle.click();
    await page.waitForFunction(() => window.AppI18n.getLanguage() === "ru");
    await expectRussian(page);
    toggle = await expectSingleToggle(page, "EN");
    await expect(page.evaluate(() => window.localStorage.getItem("lang"))).resolves.toBe("ru");
    await page.screenshot({ path: path.join(screenshotDir, "desktop-ru.png") });

    await toggle.click();
    await page.waitForFunction(() => window.AppI18n.getLanguage() === "en");
    await expectEnglish(page);
    await expectSingleToggle(page, "RU");
    await expect(consoleErrors).toEqual([]);
    await context.close();
  });

  test("defaults to Russian for ru-RU and toggles to English on mobile", async ({ browser }) => {
    ensureScreenshotDir();
    const { context, page, consoleErrors } = await newLocalizedPage(browser, "ru-RU", {
      width: 390,
      height: 844
    });

    await expectRussian(page);
    let toggle = await expectSingleToggle(page, "EN");
    await page.screenshot({ path: path.join(screenshotDir, "mobile-ru.png") });

    await toggle.click();
    await page.waitForFunction(() => window.AppI18n.getLanguage() === "en");
    await expectEnglish(page);
    toggle = await expectSingleToggle(page, "RU");
    await expect(page.evaluate(() => window.localStorage.getItem("lang"))).resolves.toBe("en");
    await page.screenshot({ path: path.join(screenshotDir, "mobile-en.png") });

    await toggle.click();
    await page.waitForFunction(() => window.AppI18n.getLanguage() === "ru");
    await expectRussian(page);
    await expectSingleToggle(page, "EN");
    await expect(consoleErrors).toEqual([]);
    await context.close();
  });
});
