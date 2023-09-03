import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Delete from '../Delete';
import { describe, expect, test, vi } from "vitest";
import { api } from "../../api"



describe("delete component", () => {
    const server = setupServer(
        rest.delete(api + '/clients/1', (req, res, ctx) => {
            return res(ctx.status(200));
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => server.close());

    it('it deletes a client when "Yes" is clicked', async () => {
        const mockSetOpen = vi.fn(()=>true)
        const routeName = '/clients/';

        render(<Delete client={{ _id: '123' }} setOpen={mockSetOpen} routeName={routeName} />);

        const yesButton = screen.getByText('Yes');
        const cancelButton = screen.getByText('Cancel');

        server.use(
            rest.delete(api + '/clients/123', (req, res, ctx) => {
                return res(ctx.status(200));
            })
        );

        fireEvent.click(yesButton);
        fireEvent.click(cancelButton);

        expect(mockSetOpen).toHaveBeenCalledTimes(1)
    });
})