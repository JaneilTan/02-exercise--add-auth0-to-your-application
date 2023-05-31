const request = require("supertest");
const app = require("./app");

describe("app", () => {
  test("POST /properties creates a new property", async () => {
    const expectedStatus = 201;
    const body = {
      askingPrice: 876330.57,
      description: "Large Executive townhouse bordering On Town Centre",
      address: "2 Bowman Avenue",
      title: "Bowman Brilliance – Style and Value!",
      img: "https://placeimg.com/642/482/arch",
    };

    await request(app)
      .post("/properties")
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });

  test("POST /properties returns a 400 when an invalid request body is provided", async () => {
    const expectedStatus = 400;
    const body = {};

    await request(app).post("/properties").send(body).expect(expectedStatus);
  });

  test("POST /properties returns a 400 when a negative askingPrice is used", async () => {
    const expectedStatus = 400;
    const body = {
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "Another Different title",
      img: "https://placeimg.com/640/480/arch",
      askingPrice: -891822.26,
    };

    await request(app).post("/properties").send(body).expect(expectedStatus);
  });

  test("GET /properties returns a list of properties", async () => {
    const expectedStatus = 200;
    const expectedBody = [
      {
        address: "8 Shasta Pass",
        askingPrice: 891822.26,
        description:
          "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
        id: "61480db44ab0cf7175467757",
        img: "https://placeimg.com/640/480/arch",
        title: "A Beauty on Shasta",
      },
      {
        address: "2 Bowman Avenue",
        askingPrice: 876330.57,
        description: "Large Executive townhouse bordering On Town Centre",
        id: "61480db44ab0cf7175467755",
        img: "https://placeimg.com/642/482/arch",
        title: "Bowman Brilliance – Style and Value!",
      },
      {
        address: "8237 Moland Hill",
        askingPrice: 946446.87,
        description: "Combining contemporary comforts with a functional layout",
        id: "61480db44ab0cf7175467756",
        img: "https://placeimg.com/644/484/arch",
        title: "Rare Moland Hill Stunner",
      },
    ];

    await request(app)
      .get("/properties")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  test("GET /properties/:id returns a single property", async () => {
    const expectedStatus = 200;
    const expectedBody = {
      askingPrice: 876330.57,
      description: "Large Executive townhouse bordering On Town Centre",
      address: "2 Bowman Avenue",
      title: "Bowman Brilliance – Style and Value!",
      img: "https://placeimg.com/642/482/arch",
      id: "61480db44ab0cf7175467755",
    };

    await request(app)
      .get("/properties/61480db44ab0cf7175467755")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  test("GET /properties/:id returns 404 when you supply an id that doesn’t exist in the database", async () => {
    const expectedStatus = 404;

    await request(app)
      .get("/properties/61480db44ab0cf7175467753")
      .expect(expectedStatus);
  });

  test("GET /properties/:id returns 400 when you supply an invalid id", async () => {
    const expectedStatus = 400;

    await request(app).get("/properties/bad-id").expect(expectedStatus);
  });
});
