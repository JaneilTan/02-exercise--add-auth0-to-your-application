const formatProperty = require("./formatProperty");

describe("formatProperty", () => {
  it("should format a property from Mongoose to API spec", () => {
    const validProperties = {
      description: "Mock description",
      address: "Mock description",
      title: "Mock description",
      img: "Mock description",
      askingPrice: "Mock description",
    };
    const received = formatProperty({
      _id: "abc",
      __v: "this-should-be-removed",
      ...validProperties,
    });
    const expected = {
      ...validProperties,
      id: "abc",
    };
    expect(received).toEqual(expected);
  });
});
