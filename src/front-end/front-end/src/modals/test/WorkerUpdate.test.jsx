import '@testing-library/jest-dom'; // For custom matchers
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test, vi } from "vitest";
import WorkerUpdate from '../WorkerUpdate';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../../api'

describe("worker update component", () => {
    // Mock the API requests using MSW
    const server = setupServer(
        rest.put(api + '/workers/', (req, res, ctx) => {
            return res(ctx.json({ id: 1, firstName: "John", lastName: "Doe", phoneNumber: "1234567890", email: "123 Main St" }));
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => server.close());

    it('should update worker modal rendered', async () => {
        const setEmail = vi.fn((email) => email)
        const setFirstName = vi.fn((name) => name)
        const setLastName = vi.fn((email) => email)
        const setPhonenumber = vi.fn((email) => email)
        const setOpen = vi.fn(() => false)
        render(<BrowserRouter>
            <WorkerUpdate
                setOpen={setOpen}
                setPhonenumber={setPhonenumber}
                setLastName={setLastName}
                setEmail={setEmail}
                setFirstName={setFirstName} />
        </BrowserRouter>);
        // Mock user input
        const firstNameInput = screen.getByLabelText('first name');
        const lastNameInput = screen.getByLabelText('last name');
        const phoneNumberInput = screen.getByLabelText('phone number');
        const emailInput = screen.getByLabelText('email');
        const saveButton = screen.getByText('Save');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
        fireEvent.change(emailInput, { target: { value: '123@s.com' } });

        expect(firstNameInput.value).toBe("John");
        expect(lastNameInput.value).toBe("Doe");
        // // Mock API response
        server.use(
            rest.put('/clients/', (req, res, ctx) => {
                return res(ctx.status(200),
                    ctx.json(ctx.json({
                        id: 1, firstName: "John", lastName: "Doe",
                        phoneNumber: "1234567890", email: "123@s.com"
                    })));
            })
        );

        fireEvent.click(saveButton);

        // Wait for the API request to resolve
        await screen.findByText('Close'); 

        // Check if the API request was made
        expect(screen.queryByText('Close')).toBeInTheDocument();
    });
})