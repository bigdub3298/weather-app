import React from "react";
import { shallow } from "enzyme";
import WeatherDisplay from "./WeatherDisplay";

let wrapper;

beforeEach(() => (wrapper = shallow(<WeatherDisplay />)));

describe("WeatherDisplay components", () => {
  it("renders without crashing", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays loading", () => {
    const loader = wrapper.find(".loader");
    expect(loader).toHaveLength(1);
    expect(loader.text()).toContain("Loading...");
  });
});
