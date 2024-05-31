import { render } from "@/tests/utils";
import { expect, test, describe } from "vitest";
import Sheet from "./Sheet";
import { fireEvent, within } from "@testing-library/react";

const renderSheet = render.bind(
  null,
  <Sheet
    title="Test"
    trigger={<button data-testid="sheet-trigger">Test</button>}
  />
);

describe("Sheet", () => {
  test("Sheet renders trigger wrapped properly", () => {
    const rendered = renderSheet();
    const triggerBtnWrapper = rendered.getByTestId("sheet-trigger-wrapper");
    const triggerBtn = within(triggerBtnWrapper).getByTestId("sheet-trigger");
    expect(triggerBtnWrapper).toBeInTheDocument();
    expect(triggerBtn).toBeInTheDocument();
  });

  test("Sheet renders conditionally when trigger is clicked portalled properly.", () => {
    const rendered = renderSheet();

    expect(rendered.queryByRole("dialog")).not.toBeInTheDocument();

    const triggerBtn = rendered.getByTestId("sheet-trigger");
    fireEvent.click(triggerBtn);

    const dialog = rendered.getByRole("dialog");
    const overlay = rendered.getByTestId("sheet-overlay");
    expect(dialog).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(dialog.parentElement?.parentElement).toBe(rendered.baseElement);
    expect(overlay.parentElement?.parentElement).toBe(rendered.baseElement);
  });
});
