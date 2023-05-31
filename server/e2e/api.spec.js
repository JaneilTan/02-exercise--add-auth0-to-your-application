require("dotenv").config();
const path = require("path");
const axios = require("axios").default;
const jestOpenAPI = require("jest-openapi").default;

jestOpenAPI(path.resolve("e2e/api-spec.yml"));

describe("POST /properties", () => {
  let token;

  beforeAll(async () => {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      }
    );
    token = response.data.access_token;
  });

  it("should meet spec for creating a new property", async () => {
    const body = {
      askingPrice: 891822.26,
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
    };

    const res = await axios.post("http://localhost:5001/properties", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.status).toEqual(201);
    expect(res).toSatisfyApiSpec();
  });

  it("should respond with 401 status code if unauthorized", async () => {
    expect.assertions(1);
    const body = {
      askingPrice: 891822.26,
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
    };

    await axios
      .post("http://localhost:5001/properties", body)
      .catch((error) => {
        expect(error.response.status).toEqual(401);
      });
  });

  it("should meet spec when an incorrect request body is provided", async () => {
    const body = {
      askingPrice: -891822.26,
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
    };

    const res = await axios.post("http://localhost:5001/properties", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => {
        return status <= 400;
      },
    });

    expect(res.status).toEqual(400);
    expect(res).toSatisfyApiSpec();
  });

  // it("should meet spec for providing an invalid request body", async () => {
  //   const res = await axios.get("http://localhost:5001/properties");

  //   expect(res.status).toEqual(200);

  //   expect(res).toSatisfyApiSpec();
  // });
});
