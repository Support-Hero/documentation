import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Worker from "../Worker";
import { api } from "../../api";
import allcontext from "../../context";
const server = setupServer(
    rest.get(`${api}/users/:id`, (req, res, ctx) => {
        const { id } = req.params;
        return res(
            ctx.json({
                id,
                firstName: "Worker",
                lastName:"Mock",
                phoneNumber:"3242342345",
                email:"sad@s.com",
                clients:[
                ]

            })
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetches and displays a worker", async () => {
    const user = { isManager: true } || { isManager: false }

    render(
        <MemoryRouter initialEntries={[`/workers/1`]}>
            <Routes>
                <Route path="/workers/:id" element={<Worker token="mockToken" />} />
            </Routes>
        </MemoryRouter>,{
            wrapper: ({ children }) => (
              <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
            ),
          }
    );

    // Check if Spinner is displayed initially
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Wait for the data to be fetched and the content to update
    await waitFor(() => screen.getByText("Detail"));
    
    // // Check if the worker's name is displayed
    expect(screen.getByText("Worker Mock")).toBeInTheDocument();
    expect(screen.getByText("3242342345")).toBeInTheDocument();
});