import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TabList } from "./TabList";
import "@testing-library/jest-dom";

describe("TabList", () => {
  it("should render and display children", async () => {
    render(
      <TabList>
        <p>Howdy!</p>
      </TabList>
    );

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should render horizontally when indicated", async () => {
    render(
      <TabList orientation="horizontal">
        <p>Howdy!</p>
      </TabList>
    );
    await screen.findByRole("tablist");
    expect(screen.getByRole("tablist")).toHaveClass("tablist__horizontal");
  });

  it("should render vertically when indicated", async () => {
    render(
      <TabList orientation="vertical">
        <p>Howdy!</p>
      </TabList>
    );
    await screen.findByRole("tablist");
    expect(screen.getByRole("tablist")).toHaveClass("tablist__vertical");
  });

  // TODO: keyboard testing
});
