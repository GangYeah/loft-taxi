import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux'

import App from "./App"

jest.mock('./Login', () => () => 'Login content');
jest.mock('./Map', () => () => 'Map content');
jest.mock('./Profile', () => () => 'Profile content');

describe("App", () => {
    it("renders correctly", () => {
        const { container } = render(<Provider><MemoryRouter><App isLoggedIn={false} /></MemoryRouter></Provider>);
        expect(container.innerHTML).toMatch("Login content");
    });
    describe("when clicked on navigation buttons", () => {
        it("opens the corresponding page", () => {
            const { getByText, container } = render(<MemoryRouter><App isLoggedIn/></MemoryRouter>);
            fireEvent.click(getByText('Карта'));
            expect(container.innerHTML).toMatch("Map content");
            fireEvent.click(getByText('Профиль'));
            expect(container.innerHTML).toMatch("Profile content");
        });
    });
});