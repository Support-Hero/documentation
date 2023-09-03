import '@testing-library/jest-dom'; // For custom matchers
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test, vi } from "vitest";
import RosterUpdate from '../rosterUpdate';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../../api'

describe("roster update component", () => {
    // Mock the API requests using MSW
    const server = setupServer(
        rest.put(api + '/rosters/', (req, res, ctx) => {
            return res(ctx.json({ id: 1, ...req.body }));
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => server.close());

    it('should update shift modal rendered', async () => {
        const setWorkerName = vi.fn((name) => name)
        const setDate = vi.fn((date) => date)
        const setOpen = vi.fn(() => false)
        const setShiftEnd = vi.fn(() => "10:00")
        const setShiftStart = vi.fn(() => "08:00")
        const setBreakStatus=vi.fn(() => false)
        const workerName='John'

        render(<BrowserRouter>
            <RosterUpdate
                setOpen={setOpen}
                setWorkerName={setWorkerName}
                setDate={setDate}
                workerName={workerName}
                setShiftEnd={setShiftEnd}
                setShiftStart={setShiftStart}
                setBreakStatus={setBreakStatus}
                 />
        </BrowserRouter>);

        // Mock user input
        const dateInput = screen.getByLabelText('Select Date');
        const shiftStartInput = screen.getByLabelText('Shift Start');
        const shiftEndInput = screen.getByLabelText('Shift End');
        const breakstatusInput = screen.getByLabelText('breakstatus');

        fireEvent.change(dateInput, { target: { value: '2022-09-01' } });
        fireEvent.change(shiftStartInput, { target: { value: '09:01' } });
        fireEvent.change(shiftEndInput, { target: { value: '10:01' } });
        fireEvent.change(breakstatusInput, { target: { value: true } });

        expect(screen.getByText('worker name: John')).toBeInTheDocument();
        expect(dateInput.value).toBe("2022-09-01");
        expect(shiftStartInput.value).toBe("09:01");
        expect(shiftEndInput.value).toBe("10:01");
        expect(breakstatusInput.value).toBe("true");

        expect(screen.queryByText('Save')).toBeInTheDocument();
        expect(screen.queryByText('Close')).toBeInTheDocument();

        const saveButton = screen.getByText('Save')
        // // Mock API response
        server.use(
            rest.post('/clients/', (req, res, ctx) => {
                return res(ctx.status(200),
                    ctx.json(ctx.json({
                        id: 1, firstName: "John", lastName: "Doe",
                        phoneNumber: "1234567890", address: "123 Main St"
                    })));
            })
        );

        fireEvent.click(saveButton);

    });
})