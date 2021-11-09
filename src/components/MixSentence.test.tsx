import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MixSentence from "./MixSentence";

beforeEach(() => {
  render(
    <MixSentence
      sentence="a b c"
      options={{ shuffleSentence: false, fakeWords: [] }}
    />
  );
});

test("expect disable after click", async () => {
  await userEvent.click(await screen.findByRole("button", { name: /a/i }));
  expect(await screen.findByRole("button", { name: /a/i })).toBeInTheDocument();
  expect(await screen.findByRole("button", { name: /a/i })).toBeDisabled();
});
test("expect compete exercise", async () => {
  await userEvent.click(await screen.findByRole("button", { name: /a/i }));
  await userEvent.click(await screen.findByRole("button", { name: /b/i }));
  await userEvent.click(await screen.findByRole("button", { name: /^c$/i }));
  await userEvent.click(
    await screen.findByRole("button", { name: /^check$/i })
  );
  await screen.findByText(/done!/i);
});
test("expect fail exercise", async () => {
  await userEvent.click(await screen.findByRole("button", { name: /a/i }));
  await userEvent.click(await screen.findByRole("button", { name: /^c$/i }));
  await userEvent.click(await screen.findByRole("button", { name: /b/i }));
  await userEvent.click(
    await screen.findByRole("button", { name: /^check$/i })
  );
  await userEvent.click(
    await screen.findByRole("button", { name: /restart/i })
  );
});
test("expect reset exercise", async () => {
  await userEvent.click(await screen.findByRole("button", { name: /a/i }));
  await userEvent.click(await screen.findByRole("button", { name: /^c$/i }));
  await userEvent.click(await screen.findByRole("button", { name: /b/i }));
  await userEvent.click(
    await screen.findByRole("button", { name: /^check$/i })
  );
  await userEvent.click(
    await screen.findByRole("button", { name: /restart/i })
  );
  expect(await screen.findByRole("button", { name: /a/i })).not.toBeDisabled;
  expect(await screen.findByRole("button", { name: /^c$/i })).not.toBeDisabled;
  expect(await screen.findByRole("button", { name: /b/i })).not.toBeDisabled;
  expect(await screen.queryByText(/restart/i)).not.toBeInTheDocument();
});
