import React from "react";
import { Tabpanel } from "../../components";

type TabpanelSampleProps = {
  panelNumber: number;
};

export const TabpanelSample = ({ panelNumber }: TabpanelSampleProps) => (
  <Tabpanel>
    <div style={{ padding: "1rem" }}>
      <h3>{`Tabpanel ${panelNumber}`}</h3>
    </div>
  </Tabpanel>
);
