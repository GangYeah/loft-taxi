import React from "react";
import Map from "./Map";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import mapbox from "mapbox-gl";

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
}));

describe("Map", () => {
  it("renders correctly", () => {
    const mockStore = {
      getState: () => ({ card: { details: {} }, address: { list: [] }, auth: { token: "" }, route: { route: [] } }),
      subscribe: () => { },
      dispatch: () => { },
    };
    const { getByTestId } = render(<Provider store={mockStore}><Map /></Provider>);
    expect(mapbox.Map).toHaveBeenCalledWith({
      container: getByTestId('map'),
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [30.2, 59.95],
      zoom: 10
    });
  });
});
