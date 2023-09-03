import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Welcome from '../welcome'
import { BrowserRouter } from "react-router-dom";
import allcontext from "../../context";
describe("welcome component", () => {
    it("should render welcome page", () => {
        const user = { firstName: "Emma", lastName: "zha" }
        render(<BrowserRouter>
            <Welcome />
        </BrowserRouter>,
            {
                wrapper: ({ children }) => (
                    <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
                ),
            }
        );
        expect(screen.getByText('Welcome,')).toBeInTheDocument();
        expect(screen.getByText('Emma zha')).toBeInTheDocument();
        const clientLinks = screen.getAllByText('Client 1');
        expect(clientLinks).toHaveLength(3);

    })
    it("should render four blocks", () => {
        const user = { firstName: "Emma", lastName: "zha" }
        render(<BrowserRouter>
            <Welcome />
        </BrowserRouter>,
            {
                wrapper: ({ children }) => (
                    <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
                ),
            }
        );

        expect(screen.getAllByLabelText("main_page_block")).toHaveLength(4)


    })
}
)