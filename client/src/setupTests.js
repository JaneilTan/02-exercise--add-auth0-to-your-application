// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import "@testing-library/jest-dom/extend-expect";

jest.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }) => children,
  withAuthenticationRequired: (component, _) => component,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: "mock_user" },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn(),
    };
  },
}));

process.env.REACT_APP_API_URL = "http://localhost:5001";
