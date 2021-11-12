import React from "react";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

import App from "./App"

jest.mock('./Login', () => () => 'Login content');
jest.mock('./Map', () => () => 'Map content');
jest.mock('./Profile', () => () => 'Profile content');

describe("App", () => {
    it("renders correctly when an user unauthorized", () => {
        const mockStore = {
            getState: () => ({ auth: { isLoggedIn: false } }),
            subscribe: () => { },
            dispatch: () => { },
        };
        const history = createMemoryHistory();
        const { container } = render(
            <Router history={history}>
                <Provider store={mockStore}>
                    <App />
                </Provider>
            </Router>
        );
        expect(container.innerHTML).toMatch("Login content");
    });
    it("renders correctly when an user authorized", () => {
        const mockStore = {
            getState: () => ({ auth: { isLoggedIn: true } }),
            subscribe: () => { },
            dispatch: () => { },
        };
        const history = createMemoryHistory();
        history.push('/map');
        const { container } = render(
            <Router history={history}>
                <Provider store={mockStore}>
                    <App />
                </Provider>
            </Router>
        );
        expect(container.innerHTML).toMatch("Map content");
    });
});