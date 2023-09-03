import React from "react";
import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import Clients from "../Clients"; // Adjust the path accordingly
import { afterEach, describe, expect, it, vi } from 'vitest'
import allcontext from "../../context";
import { api } from '../../api'

describe("Clients Component", () => {
    // Setup Mock Service Worker
    const server = setupServer(
        rest.get(api+"/clients", (req, res, ctx) => {
            return res(
                ctx.json([
                    
                    // Provide sample worker data here
                    // Adjust this data based on your actual API response
                    { _id: "1", firstName: "John", lastName: "Doe", address: "jsas 1 com", phoneNumber: "1234567890" },
                    // More worker data...
                ])
            );
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("renders clients data and interacts with components", async () => {

        const user = { isManager: true } || { isManager: false }
        render(
            <BrowserRouter>
                <Clients />
            </BrowserRouter>,{
            wrapper: ({ children }) => (
              <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
            ),
          }
        );

        // Wait for the initial data to be loaded
        await waitFor(() => screen.getByText("John"));

        // Verify that the worker's data is displayed
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("jsas 1 com")).toBeInTheDocument();
        expect(screen.getByText("1234567890")).toBeInTheDocument();

        // Test interaction (example: clicking the Update button)
        const updateButton = screen.getByText("Update");
        fireEvent.click(updateButton);
        // Verify that the modal or update component is opened
        expect(screen.getByLabelText("Update Client")).toBeInTheDocument();

        const createButton = screen.getByText("+ Add New Clients");
        fireEvent.click(createButton);
        expect(screen.getByLabelText("Add Client")).toBeInTheDocument();
        
        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);
        expect(screen.getByLabelText("Delete")).toBeInTheDocument();
    })
});

