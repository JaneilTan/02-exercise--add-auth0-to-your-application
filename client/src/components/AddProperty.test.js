import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import AddProperty from "./AddProperty";
import { Auth0Provider } from "@auth0/auth0-react";

describe("AddProperty", () => {
  it("should create a new property when the add property form is submitted", async () => {
    const body = {
      title: "Example title",
      askingPrice: 100,
      description: "Example description",
      address: "123 Example Address",
      img: "http://example-image.jpg",
    };

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "abc", body }),
    });

    const history = createMemoryHistory();

    const { getByLabelText, getByText } = render(
      <Router location={history.location} navigator={history}>
        <Auth0Provider>
          <AddProperty />
        </Auth0Provider>
      </Router>
    );

    // Fill in the form fields

    const titleInput = getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: body.title } });
    const askingPriceInput = getByLabelText(/price/i);
    fireEvent.change(askingPriceInput, {
      target: { value: body.askingPrice },
    });
    const descriptionInput = getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: body.description },
    });
    const addressInput = getByLabelText(/address/i);
    fireEvent.change(addressInput, {
      target: { value: body.address },
    });
    const imgInput = getByLabelText(/image/i);
    fireEvent.change(imgInput, {
      target: { value: body.img },
    });

    // Click the submit button to simulate a form submission
    const submitBtn = getByText(/submit/i);
    fireEvent.click(submitBtn);
    await waitFor(
      () => {
        // Assert fetch is called with all the right things
        const calledWith = window.fetch.mock.calls[0];
        const fetchUrl = calledWith[0];

        expect(fetchUrl).toEqual("http://localhost:5001/properties");
        // fetch body is a JSON string, so parse it to compare objects
        const fetchBody = JSON.parse(calledWith[1].body);
        expect(fetchBody).toEqual(body);
        const fetchHeaders = calledWith[1].headers;
        expect(fetchHeaders).toEqual(
          expect.objectContaining({ "Content-Type": "application/json" })
        );
      },
      { timeout: 0 }
    );
  });

  it("should redirect to '/' after a successful POST request", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {},
    });

    const history = createMemoryHistory();

    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Auth0Provider>
          <AddProperty />
        </Auth0Provider>
      </Router>
    );

    // Click the submit button to simulate a form submission
    await waitFor(
      () => {
        const submitBtn = getByText("Submit");
        fireEvent.click(submitBtn);
        expect(history.location.pathname).toEqual("/");
      },
      { timeout: 0 }
    );
  });
});
