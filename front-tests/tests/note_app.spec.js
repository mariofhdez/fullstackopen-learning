const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "administrator",
        username: "admin",
        password: "admin",
      },
    });

    await page.goto("/");
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

    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')

        await otherNoteElement.getByRole("button", { name: "make not important" }).click();

        await expect(otherNoteElement.getByText("make important")).toBeVisible();
      });
    });
  });
});
