import { render, screen } from "@testing-library/react";
import Scoreboard from "../screens/scoreboard";

describe("Scoreboard", () => {
  it("should show scoreboard screen", async () => {
    render(<Scoreboard />);
    const text = screen.getByText("Loading data...");
    expect(text).toBeInTheDocument();
  });
});