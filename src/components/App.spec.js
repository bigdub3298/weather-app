import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import WeatherDisplay from "components/WeatherDisplay/WeatherDisplay";

describe("App component", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<App />)));

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("shows weather display", () => {
    expect(wrapper.find(WeatherDisplay)).toHaveLength(1);
  });
});
