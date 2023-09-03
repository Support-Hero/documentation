import '@testing-library/jest-dom'; // For custom matchers
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test, vi } from "vitest";
import WorkerCreate from '../WorkerCreate';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../../api'

describe("worker create component", () => {
    // Mock the API requests using MSW
    const server = setupServer(
        rest.post(api + '/workers/', (req, res, ctx) => {
            return res(ctx.json({ id: 1, ...req.body }));
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => server.close());

    it('should add a new worker modal rendered', async () => {
        const setEmail = vi.fn((email) => email)
        const setFirstName = vi.fn((name) => name)
        const setLastName = vi.fn((address) => address)
        const setPhonenumber = vi.fn((address) => address)
        const setOpen = vi.fn(() => false)
        const mockreload = vi.fn(() => window.location.reload())
        render(<BrowserRouter>
            <WorkerCreate
                setEmail={setEmail}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPhonenumber={setPhonenumber}
                setOpen={setOpen}
            />
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
        fireEvent.change(emailInput, { target: { value: '123@qw.com' } });
        
        expect(firstNameInput.value).toBe("John");
        expect(lastNameInput.value).toBe("Doe");
        expect(phoneNumberInput.value).toBe("1234567890");
        expect(emailInput.value).toBe("123@qw.com");
        // Mock API response
        server.use(
            rest.post('/clients/', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(req.body));
            })
        );

        fireEvent.click(saveButton);

        // Wait for the API request to resolve
        await screen.findByText('Close');

        expect(mockreload).toHaveBeenCalledTimes(0)
        // Check if the API request was made
        expect(screen.queryByText('Close')).toBeInTheDocument();
    });
})