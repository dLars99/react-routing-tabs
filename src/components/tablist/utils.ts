type KeyInstruction = "plus" | "minus" | "first" | "last" | "select" | null;

export const getInstructionFromKey = (
  key: string,
  orientation: "horizontal" | "vertical"
): KeyInstruction => {
  if (
    (orientation === "horizontal" && key === "ArrowRight") ||
    (orientation === "vertical" && key === "ArrowDown")
  ) {
    return "plus";
  }

  if (
    (orientation === "horizontal" && key === "ArrowLeft") ||
    (orientation === "vertical" && key === "ArrowUp")
  ) {
    return "minus";
  }

  if (key === "Home") {
    return "first";
  }

  if (key === "End") {
    return "last";
  }

  if (key === "Enter" || key === " ") {
    return "select";
  }

  // unmapped key
  return null;
};
