import { act, render, screen, waitFor } from "@testing-library/react";
import Scoreboard from "../screens/scoreboard";

describe("Scoreboard", () => {

  const testData = [
    {
      "userID": "4f4d5462-4a9f-483e-b620-9df9c13ec840",
      "displayName": "Jone",
      "picture": "https://assets-17app.akamaized.net/THUMBNAIL_525BEE6E-94B5-4C7F-AB47-1A6F9735EE82.jpg",
      "score": 157000
    },
  ];

  it("should show scoreboard screen", async () => {
    render(<Scoreboard />);
    const text = screen.getByText("Loading data...");
    expect(text).toBeInTheDocument();
  });


  it('should fetch data successfully and display it', async () => {
    const successMock = () => Promise.resolve({
      ok: true, status: 200, statusText: 'ok',
      json: () => Promise.resolve(testData)
    });
    global.fetch = jest.fn().mockImplementation(successMock);

    render(<Scoreboard />);
    let listElements

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      listElements = screen.getAllByRole('listitem');
    })
    expect(listElements).toHaveLength(1);

  });
});