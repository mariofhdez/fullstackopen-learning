const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "administrator",
        username: "admin",
        password: "admin",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");

    await expect(locator).toBeVisible();
    await expect(page.getByText("Note app, Mario Flórez - 2025")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "admin", "admin");

    await expect(
      page.getByText("User 'administrator' logged in"),
    ).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "admin", "wrong");

    const errorDiv = page.locator(".error");

    await expect(errorDiv).toContainText("Wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    await expect(
      page.getByText("User 'administrator' logged in"),
    ).not.toBeVisible();
  });

  describe("when logged in", () => {
    (beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "admin");
    }),
      test("a new note can be created", async ({ page }) => {
        await createNote(page, "a note created by playwright");

        await expect(
          page.getByText("a note created by playwright"),
        ).toBeVisible();
      }));

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "another note by playwright");
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();

        await expect(page.getByText("make important")).toBeVisible();
      });
    });
  });
});
