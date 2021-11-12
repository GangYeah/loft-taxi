import React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("LoginForm", () => {
  describe("on submit", () => {
    it("dispatches log in credentials", async () => {
      const mockDispatch = jest.fn();
      const mockStore = {
        getState: () => ({ auth: { isLoggedIn: false } }),
        subscribe: () => { },
        dispatch: () => { },
      };
      const { container, getByLabelText, getByText } = render(
        <MemoryRouter>
          <Provider store={mockStore}>
            <Login authenticate={() => mockDispatch} />
          </Provider>
        </MemoryRouter>
      );

      const emailInput = getByLabelText("Email");
      const passwordInput = getByLabelText("Пароль");

      await waitFor(async () => {
        fireEvent.change(emailInput, { target: { value: "testemail" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.click(getByText("Войти"));
      });

      expect(mockDispatch).toBeCalledWith({
        payload: { email: "testemail", password: "testpassword" },
        type: "AUTHENTICATE",
      });
    });
  });
});
