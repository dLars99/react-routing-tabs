import React, { FC } from "react";
import { render, screen } from "@testing-library/react";
import { RoutingTabs } from "./RoutingTabContext";
import "@testing-library/jest-dom";

const testComponent: FC = () => (
  <RoutingTabs>
    <p>Howdy</p>
  </RoutingTabs>
);

test("loads and displays children", async () => {
  await screen.findByText("Howdy");
  expect(screen.getByText("Howdy")).toBeTruthy();
});
