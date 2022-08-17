import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("should show scoreboard screen when starting app", async () => {
    render(<App />);
    const text = screen.getByText("Loading data...");
    expect(text).toBeInTheDocument();
  });
});
